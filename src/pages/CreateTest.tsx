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

  if (
    selectedTopics.length === 0
  ) return;

  getSubTopicsByTopicList(
    selectedTopics
  )
    .then((res) => {

      console.log(
        "SUBTOPICS:",
        res
      );

      setSubTopics(res.data);

    })
    .catch((err) => {

      console.log(
        "SUBTOPIC ERROR:",
        err
      );

    });

}, [selectedTopics]);

  useEffect(() => {
    if (!id) return;

    getTestById(id)
      .then((res) => {
        console.log("TEST DETAILS:", res);

        const test = res.data;

        setValue("testName", test.name);

        setNumberOfQuestions(
          String(test.total_questions || "")
        );

        setTotalMarks(
          String(test.total_marks || "")
        );
      })
      .catch((err) => {
        console.log("TEST DETAILS ERROR:", err);
      });
  }, [id, setValue]);


  const onSubmit = async (data: any) => {
    try {
      const payload = {
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
        status: null,
      };

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

  return (
    <div className="page-layout">

      <Sidebar />

      <div className="create-test-container">

        <Header />

        <p className="breadcrumb">
          Test Creation / Create Test / Chapter Wise
        </p>

        <h2>Create Test</h2>

        <div className="tabs">

          <button
            className={testType === "Chapter Wise" ? "active-tab" : ""}
            onClick={() => setTestType("Chapter Wise")}
          >
            Chapter Wise
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
          <div className="form-group">
            <label>Subject</label>
            <select
              {...register("subject", {
                required: "Subject is required",
              })}
              onChange={(e) => setSubject(e.target.value)}
            >
              <option value="">Choose Subject</option>

              {subjects.map((subject) => (
                <option
                  key={subject.id}
                  value={subject.id}
                >
                  {subject.name}
                </option>
              ))}
            </select>

            {errors.subject && (
              <p className="error">
                {errors.subject.message as string}
              </p>
            )}
          </div>

          <div className="form-group">
            <label>Name of Test</label>
            <input
              type="text"
              placeholder="Enter Test Name"
              {...register("testName", {
                required: "Test Name is required",
              })}
            />

            {errors.testName && (
              <p className="error">
                {errors.testName.message as string}
              </p>
            )}
          </div>

          <div className="form-group">
            <label>Topic</label>
            <select
              multiple
              value={selectedTopics}
              onChange={(e) => {
                const values = Array.from(
                  e.target.selectedOptions,
                  (option) => option.value
                );

                setSelectedTopics(values);
              }}
            >
              {topics.map((topic) => (
                <option
                  key={topic.id}
                  value={topic.id}
                >
                  {topic.name}
                </option>
              ))}
            </select>

            {errors.topic && (
              <p className="error">
                {errors.topic.message as string}
              </p>
            )}
          </div>

          <div className="form-group">
            <label>Sub Topic</label>
            <select
              {...register("subTopic")}
            >
              <option value="">
                Choose Sub Topic
              </option>

              {subTopics.map((subTopic) => (
                <option
                  key={subTopic.id}
                  value={subTopic.id}
                >
                  {subTopic.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Duration (Minutes)</label>
            <input
              type="number"
              placeholder="Duration"
              {...register("duration", {
                required: "Duration is required",
              })}
            />

            {errors.duration && (
              <p className="error">
                {errors.duration.message as string}
              </p>
            )}
          </div>

          <div className="form-group">
            <label>Difficulty</label>

            <div className="difficulty-group">
              <label>
                <input
                  type="radio"
                  value="Easy"
                  checked={difficulty === "Easy"}
                  onChange={(e) => setDifficulty(e.target.value)}
                />
                Easy
              </label>

              <label>
                <input
                  type="radio"
                  value="Medium"
                  checked={difficulty === "Medium"}
                  onChange={(e) => setDifficulty(e.target.value)}
                />
                Medium
              </label>

              <label>
                <input
                  type="radio"
                  value="Difficult"
                  checked={difficulty === "Difficult"}
                  onChange={(e) => setDifficulty(e.target.value)}
                />
                Difficult
              </label>
            </div>
          </div>
        </div>

        {/* Marking Scheme */}

        <h4 className="section-title">Marking Scheme:</h4>

        <div className="marking-grid">

          <div className="form-group">
            <label>Wrong Answer</label>
            <input
              type="number"
              value={wrongMarks}
              onChange={(e) => setWrongMarks(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Unattempted</label>
            <input
              type="number"
              value={unattemptedMarks}
              onChange={(e) => setUnattemptedMarks(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Correct Answer</label>
            <input
              type="number"
              value={correctMarks}
              onChange={(e) => setCorrectMarks(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>No. of Questions</label>
            <input
              type="number"
              placeholder="Enter Number of Questions"
              value={numberOfQuestions}
              onChange={(e) => setNumberOfQuestions(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Total Marks</label>
            <input
              type="number"
              placeholder="Enter Total Marks"
              value={totalMarks}
              onChange={(e) => setTotalMarks(e.target.value)}
            />
          </div>

        </div>

        {/* Buttons */}
        <div className="button-row">

          <button className="cancel-btn">
            Cancel
          </button>

          <button className="draft-btn">
            Save as Draft
          </button>

          <button
            className="next-btn"
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