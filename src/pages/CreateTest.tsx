import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { getSubjects } from "../services/testService";
import "../styles/CreateTest.css";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import { useNavigate } from "react-router-dom";

function CreateTest() {
  const [testName, setTestName] = useState("");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [subTopic, setSubTopic] = useState("");
  const [duration, setDuration] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");

  const [wrongMarks, setWrongMarks] = useState("-1");
  const [unattemptedMarks, setUnattemptedMarks] = useState("0");
  const [correctMarks, setCorrectMarks] = useState("5");

  const [numberOfQuestions, setNumberOfQuestions] = useState("");
  const [totalMarks, setTotalMarks] = useState("");

  const [testType, setTestType] = useState("Chapter Wise");

  const navigate = useNavigate();

  useEffect(() => {
    getSubjects()
      .then((res) => {
        console.log("SUBJECTS:", res);
      })
      .catch((err) => {
        console.log("SUBJECT ERROR:", err);
      });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);

    navigate("/questions");
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
            <input
              type="text"
              placeholder="Choose Subject"
              {...register("subject", {
                required: "Subject is required",
              })}
            />

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
            <input
              type="text"
              placeholder="Enter Topic"
              {...register("topic", {
                required: "Topic is required",
              })}
            />

            {errors.topic && (
              <p className="error">
                {errors.topic.message as string}
              </p>
            )}
          </div>

          <div className="form-group">
            <label>Sub Topic</label>
            <input
              type="text"
              placeholder="Enter Sub Topic"
              value={subTopic}
              onChange={(e) => setSubTopic(e.target.value)}
            />
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