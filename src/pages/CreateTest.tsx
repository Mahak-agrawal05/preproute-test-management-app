import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  getSubjects,
  getTopicsBySubject,
  getSubTopicsByTopicList,
  createTest,
  updateTest,
  getTestById,
} from "../services/testService";
import "../styles/CreateTest.css";

import { useParams } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import { useNavigate } from "react-router-dom";

interface Subject {
  id: string;
  name: string;
}

interface Topic {
  id: string;
  name: string;
  subject_id: string;
}

interface SubTopic {
  id: string;
  name: string;
  topic_id: string;
}

function CreateTest() {
  const [subject, setSubject] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");

  const [wrongMarks, setWrongMarks] = useState("-1");
  const [unattemptedMarks, setUnattemptedMarks] = useState("0");
  const [correctMarks, setCorrectMarks] = useState("5");

  const [numberOfQuestions, setNumberOfQuestions] = useState("");
  const [totalMarks, setTotalMarks] = useState("");

  const [testType, setTestType] = useState("Chapter Wise");
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [subTopics, setSubTopics] = useState<SubTopic[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const navigate = useNavigate();

  const { id } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getSubjects()
      .then((res) => {
        console.log("SUBJECTS:", res);
        setSubjects(res.data);
      })
      .catch((err) => {
        console.log("SUBJECT ERROR:", err);
      });
  }, []);

  useEffect(() => {
    if (!subject) return;
    getTopicsBySubject(subject)
      .then((res) => {
        console.log("TOPICS:", res);
        setTopics(res.data);
      })
      .catch((err) => {
        console.log("TOPIC ERROR:", err);
      });
  }, [subject]);

  useEffect(() => {
    if (selectedTopics.length === 0) return;
    getSubTopicsByTopicList(selectedTopics)
      .then((res) => {
        console.log("SUBTOPICS:", res);
        setSubTopics(res.data);
      })
      .catch((err) => {
        console.log("SUBTOPIC ERROR:", err);
      });
  }, [selectedTopics]);

  useEffect(() => {
    if (!id) return;
    getTestById(id)
      .then((res) => {
        console.log("TEST DETAILS:", res);
        const test = res.data;
        setValue("testName", test.name);
        setNumberOfQuestions(String(test.total_questions || ""));
        setTotalMarks(String(test.total_marks || ""));
      })
      .catch((err) => {
        console.log("TEST DETAILS ERROR:", err);
      });
  }, [id, setValue]);

  const buildPayload = (data: any, status: string | null) => ({
    name: data.testName,
    type: testType,
    subject: data.subject,
    topics: selectedTopics,
    sub_topics: [data.subTopic],
    correct_marks: Number(correctMarks),
    wrong_marks: Number(wrongMarks),
    unattempt_marks: Number(unattemptedMarks),
    difficulty: difficulty.toLowerCase(),
    total_time: Number(data.duration),
    total_marks: Number(totalMarks),
    total_questions: Number(numberOfQuestions),
    status,
  });

  const onSubmit = async (data: any) => {
    try {
      const payload = buildPayload(data, null);
      console.log("CREATE TEST:", payload);
      let response;
      if (id) {
        response = await updateTest(id, payload);
      } else {
        response = await createTest(payload);
      }
      console.log(response);
      navigate("/questions");
    } catch (error) {
      console.error("CREATE TEST ERROR:", error);
    }
  };

  const onSaveAsDraft = async (data: any) => {
    try {
      const payload = buildPayload(data, "draft");
      console.log("SAVE AS DRAFT:", payload);
      let response;
      if (id) {
        response = await updateTest(id, payload);
      } else {
        response = await createTest(payload);
      }
      console.log(response);
      navigate("/test-creation");
    } catch (error) {
      console.error("SAVE AS DRAFT ERROR:", error);
    }
  };

  return (
    <div className="page-layout">
      <Sidebar />

      <div className="create-test-container">
        <Header />

        {/* Breadcrumb */}
        <p className="breadcrumb">
          Test Creation &nbsp;/&nbsp; Create Test &nbsp;/&nbsp; Chapter Wise
        </p>

        {/* Tabs */}
        <div className="tabs">
          <button
            className={testType === "Chapter Wise" ? "active-tab" : ""}
            onClick={() => setTestType("Chapter Wise")}
          >
            Chapterwise
          </button>

          <button
            className={testType === "PYQ" ? "active-tab" : ""}
            onClick={() => setTestType("PYQ")}
          >
            PYQ
          </button>

          <button
            className={testType === "Mock Test" ? "active-tab" : ""}
            onClick={() => setTestType("Mock Test")}
          >
            Mock Test
          </button>
        </div>

        {/* Basic Details */}
        <div className="form-grid">

          {/* Subject */}
          <div className="form-group">
            <label>Subject</label>
            <div className="select-wrapper">
              <select
                {...register("subject", { required: "Subject is required" })}
                onChange={(e) => setSubject(e.target.value)}
              >
                <option value="">Choose from Drop-down</option>
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            {errors.subject && (
              <p className="error">{errors.subject.message as string}</p>
            )}
          </div>

          {/* Name of Test */}
          <div className="form-group">
            <label>Name of Test</label>
            <input
              type="text"
              placeholder="Enter name of Test"
              {...register("testName", { required: "Test Name is required" })}
            />
            {errors.testName && (
              <p className="error">{errors.testName.message as string}</p>
            )}
          </div>

          {/* Topic */}
          <div className="form-group">
            <label>Topic</label>
            <div className="select-wrapper">
              <select
                onChange={(e) => {
                  setSelectedTopics([e.target.value]);
                }}
                defaultValue=""
              >
                <option value="">Choose from Drop-down</option>
                {topics.map((topic) => (
                  <option key={topic.id} value={topic.id}>
                    {topic.name}
                  </option>
                ))}
              </select>
            </div>
            {errors.topic && (
              <p className="error">{errors.topic.message as string}</p>
            )}
          </div>

          {/* Sub Topic */}
          <div className="form-group">
            <label>Sub Topic</label>
            <div className="select-wrapper">
              <select {...register("subTopic")}>
                <option value="">Choose from Drop-down</option>
                {subTopics.map((st) => (
                  <option key={st.id} value={st.id}>
                    {st.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Duration */}
          <div className="form-group">
            <label>Duration (Minutes)</label>
            <input
              type="number"
              placeholder="Enter the time"
              {...register("duration", { required: "Duration is required" })}
            />
            {errors.duration && (
              <p className="error">{errors.duration.message as string}</p>
            )}
          </div>

          {/* Difficulty */}
          <div className="difficulty-group">
            <label className="radio-label">
              <input
                type="radio"
                name="difficulty"
                value="Easy"
                checked={difficulty === "Easy"}
                onChange={(e) => setDifficulty(e.target.value)}
              />
              Easy
            </label>

            <label className="radio-label">
              <input
                type="radio"
                name="difficulty"
                value="Medium"
                checked={difficulty === "Medium"}
                onChange={(e) => setDifficulty(e.target.value)}
              />
              Medium
            </label>

            <label className="radio-label">
              <input
                type="radio"
                name="difficulty"
                value="Difficult"
                checked={difficulty === "Difficult"}
                onChange={(e) => setDifficulty(e.target.value)}
              />
              Difficult
            </label>
          </div>
        </div>

        {/* Marking Scheme */}
        <h4 className="section-title">Marking Scheme:</h4>

        <div className="marking-grid">
          <div className="form-group">
            <label>Wrong Answer</label>
            <div className="marking-input-wrapper">
              <input
                type="number"
                value={wrongMarks}
                onChange={(e) => setWrongMarks(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Unattempted</label>
            <div className="marking-input-wrapper">
              <input
                type="number"
                value={unattemptedMarks}
                onChange={(e) => setUnattemptedMarks(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Correct Answer</label>
            <div className="marking-input-wrapper">
              <input
                type="number"
                value={correctMarks}
                onChange={(e) => setCorrectMarks(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>No of Questions</label>
            <input
              type="number"
              placeholder="Ex:250 Marks"
              value={numberOfQuestions}
              onChange={(e) => setNumberOfQuestions(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Total Marks</label>
            <input
              type="number"
              placeholder="Ex:250 Marks"
              value={totalMarks}
              onChange={(e) => setTotalMarks(e.target.value)}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="button-row">
          <button className="cancel-btn" type="button">
            Cancel
          </button>

          <button
            className="draft-btn"
            type="button"
            onClick={handleSubmit(onSaveAsDraft)}
          >
            Save as Draft
          </button>

          <button
            className="next-btn"
            type="button"
            onClick={handleSubmit(onSubmit)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateTest;
