import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { publishTest } from "../services/testService";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import "../styles/Publish.css";

function Publish() {
  const navigate = useNavigate();

  const [publishType, setPublishType] = useState("now");
  const [liveUntil, setLiveUntil] = useState("always");
  const [questions, setQuestions] = useState<any[]>([]);
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    const savedQuestions = localStorage.getItem("questions");
    if (savedQuestions) {
      setQuestions(JSON.parse(savedQuestions));
    }
  }, []);

  const handlePublish = async () => {
    try {
      const testId = "test-uuid";
      const response = await publishTest(testId);
      console.log("PUBLISH RESPONSE:", response);
    } catch (error) {
      console.log("PUBLISH ERROR:", error);
    }
    alert("Test Published Successfully");
    navigate("/dashboard");
  };

  // Options ordered so they fill left-col then right-col row by row:
  // Row1: Always Available | 1 Week
  // Row2: 2 Weeks          | 3 Weeks
  // Row3: 1 Month          | Custom Duration
  const liveOptions = [
    { value: "always",  label: "Always Available" },
    { value: "1week",   label: "1 Week" },
    { value: "2weeks",  label: "2 Weeks" },
    { value: "3weeks",  label: "3 Weeks" },
    { value: "1month",  label: "1 Month" },
    { value: "custom",  label: "Custom Duration" },
  ];

  return (
    <div className="page-layout">
      <Sidebar />

      <div className="publish-container">
        <Header />

        <p className="breadcrumb">Test Creation / Publish Test</p>
        <h1 className="publish-title">Publish Test</h1>

        {/* Chapter Card */}
        <div className="chapter-card">
          <div className="chapter-card-header">
            <div className="chapter-badge-row">
              <span className="chapter-wise-badge">Chapter Wise</span>
            </div>
            <button
              className="edit-icon-btn"
              onClick={() => navigate("/create-test")}
            >
              ✏️
            </button>
          </div>

          <h3 className="chapter-title">
            📚 Chapter 1
            <span className="difficulty-badge">😊 Easy</span>
          </h3>

          <div className="chapter-meta">
            <div className="meta-row">
              <span className="meta-label">Subject</span>
              <span className="meta-sep">:</span>
              <span className="meta-value">English</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">Topic</span>
              <span className="meta-sep">:</span>
              <span className="topic-tags">
                <span className="topic-tag">Grammar</span>
                <span className="topic-tag">Writing</span>
              </span>
            </div>
            <div className="meta-row">
              <span className="meta-label">Sub Topic</span>
              <span className="meta-sep">:</span>
              <span className="topic-tag">Application</span>
            </div>
          </div>

          <div className="chapter-stats">
            <span className="stat-item">
              <span className="stat-icon">⏱</span> 60 Min
            </span>
            <span className="stat-divider" />
            <span className="stat-item">
              <span className="stat-icon">📋</span> 50 Q's
            </span>
            <span className="stat-divider" />
            <span className="stat-item">
              <span className="stat-icon">🏆</span> 250 Marks
            </span>
          </div>
        </div>

        {/* Questions Preview */}
        {questions.length > 0 && (
          <div className="questions-preview">
            <h3>Questions Preview</h3>
            {questions.map((q, index) => (
              <div key={q.id} className="question-preview-card">
                <h4>Question {index + 1}</h4>
                <p>{q.question}</p>
                <p>A. {q.optionA}</p>
                <p>B. {q.optionB}</p>
                <p>C. {q.optionC}</p>
                <p>D. {q.optionD}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tabs */}
        <div className="publish-tabs">
          <button
            className={publishType === "now" ? "tab-btn active-tab" : "tab-btn"}
            onClick={() => setPublishType("now")}
          >
            Publish Now
          </button>
          <button
            className={
              publishType === "schedule" ? "tab-btn active-tab" : "tab-btn"
            }
            onClick={() => setPublishType("schedule")}
          >
            Schedule Publish
          </button>
        </div>

        {/* Publish Now */}
        {publishType === "now" && (
          <div className="publish-card">
            <h3 className="live-until-title">Live Until</h3>
            <p className="live-until-desc">
              Choose how long this test should remain available on the platform.
            </p>

            <div className="radio-grid">
              {liveOptions.map((opt) => (
                <label key={opt.value} className="radio-option">
                  <input
                    type="radio"
                    name="live"
                    value={opt.value}
                    checked={liveUntil === opt.value}
                    onChange={() => setLiveUntil(opt.value)}
                  />
                  <span className="radio-label">{opt.label}</span>
                </label>
              ))}
            </div>

            {liveUntil === "custom" && (
              <div className="custom-duration-row">
                <div className="custom-input-group">
                  <div className="custom-date-field">
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                    <span className="field-icon">📅</span>
                  </div>
                  <div className="custom-time-field">
                    <input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                    />
                    <span className="field-icon">🕐</span>
                  </div>
                </div>
                <div className="custom-confirm-row">
                  <button
                    className="cancel-btn"
                    onClick={() => setLiveUntil("always")}
                  >
                    Cancel
                  </button>
                  <button className="confirm-btn">Confirm</button>
                </div>
              </div>
            )}
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

        {/* Bottom Buttons */}
        <div className="button-row">
          <button
            className="outline-btn"
            onClick={() => navigate("/questions")}
          >
            Previous
          </button>
          <button
            className="outline-btn"
            onClick={() => navigate("/create-test")}
          >
            Edit Test
          </button>
          <button
            className="outline-btn"
            onClick={() => navigate("/questions")}
          >
            Edit Questions
          </button>
          <button className="publish-btn" onClick={handlePublish}>
            Publish Test
          </button>
        </div>
      </div>
    </div>
  );
}

export default Publish;
