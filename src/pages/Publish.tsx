import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import "../styles/Publish.css";

function Publish() {
  const navigate = useNavigate();

  const [publishType, setPublishType] = useState("now");
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    const savedQuestions =
      localStorage.getItem("questions");

    if (savedQuestions) {
      setQuestions(
        JSON.parse(savedQuestions)
      );
    }
  }, []);

  const handlePublish = () => {
    alert("Test Published Successfully");
    navigate("/dashboard");
  };

  return (
    <div className="page-layout">

      <Sidebar />

      <div className="publish-container">

        <Header />

        <p className="breadcrumb">
          Test Creation / Publish Test
        </p>

        <h1>Publish Test</h1>

        <div className="chapter-card">

          <h3>Chapter 1</h3>

          <p>Subject: English</p>
          <p>Topic: Grammar, Writing</p>
          <p>Sub Topic: Application</p>

          <div className="chapter-stats">
            <span>60 Minutes</span>
            <span>50 Questions</span>
            <span>250 Marks</span>
          </div>

        </div>
        <div className="questions-preview">

          <h3>Questions Preview</h3>

          {questions.map((q, index) => (
            <div
              key={q.id}
              className="question-preview-card"
            >
              <h4>
                Question {index + 1}
              </h4>

              <p>{q.question}</p>

              <p>A. {q.optionA}</p>
              <p>B. {q.optionB}</p>
              <p>C. {q.optionC}</p>
              <p>D. {q.optionD}</p>

            </div>
          ))}

        </div>

        {/* Tabs */}

        <div className="publish-tabs">

          <button
            className={publishType === "now" ? "active-tab" : ""}
            onClick={() => setPublishType("now")}
          >
            Publish Now
          </button>

          <button
            className={publishType === "schedule" ? "active-tab" : ""}
            onClick={() => setPublishType("schedule")}
          >
            Schedule Publish
          </button>

        </div>

        {/* Publish Now */}

        {publishType === "now" && (
          <div className="publish-card">

            <h3>Live Until</h3>

            <label><input type="radio" name="live" /> Always Available</label>
            <label><input type="radio" name="live" /> 1 Week</label>
            <label><input type="radio" name="live" /> 2 Weeks</label>
            <label><input type="radio" name="live" /> 3 Weeks</label>
            <label><input type="radio" name="live" /> 1 Month</label>
            <label><input type="radio" name="live" /> Custom Duration</label>

          </div>
        )}

        {/* Schedule Publish */}

        {publishType === "schedule" && (
          <div className="publish-card">

            <div className="form-group">
              <label>Publish Date</label>
              <input type="date" />
            </div>

            <div className="form-group">
              <label>Publish Time</label>
              <input type="time" />
            </div>

            <div className="form-group">
              <label>Live Until</label>

              <select>
                <option>1 Week</option>
                <option>2 Weeks</option>
                <option>3 Weeks</option>
                <option>1 Month</option>
              </select>
            </div>

          </div>
        )}

        <div className="button-row">

          <button
            className="cancel-btn"
            onClick={() => navigate("/questions")}
          >
            Previous
          </button>

          <button
            className="edit-btn"
            onClick={() => navigate("/create-test")}
          >
            Edit Test
          </button>

          <button
            className="edit-btn"
            onClick={() => navigate("/questions")}
          >
            Edit Questions
          </button>

          <button
            className="next-btn"
            onClick={handlePublish}
          >
            Publish Test
          </button>

        </div>

      </div>

    </div>
  );
}

export default Publish;