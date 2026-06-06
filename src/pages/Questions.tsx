import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { bulkCreateQuestions } from "../services/testService";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import "../styles/Questions.css";

/* ── Trash icon ── */
const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4h6v2" />
  </svg>
);

/* ── Toolbar buttons config ── */
const TOOLBAR = [
  { label: "I",  style: { fontStyle: "italic", fontWeight: 400 } },
  { label: "B",  style: { fontWeight: 700 } },
  { label: "U",  style: { textDecoration: "underline" } },
  { label: "S̶",  style: { textDecoration: "line-through" } },
  null, // divider
  { label: "⬛", style: {} },
  { label: "≡",  style: {} },
  { label: "≡",  style: {} },
  { label: "≡",  style: {} },
  { label: "☰",  style: {} },
  null,
  { label: "⊞",  style: {} },
  { label: "—",  style: {} },
  { label: "🖼", style: {} },
  { label: "fx",  style: {} },
];

function Questions() {
  const navigate = useNavigate();

  const [question, setQuestion] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [solution, setSolution] = useState("");

  const [difficulty, setDifficulty] = useState("");
  const [topic, setTopic] = useState("");
  const [subTopic, setSubTopic] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const [questions, setQuestions] = useState<any[]>([]);

  const [correctOption, setCorrectOption] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");

  const addQuestion = () => {
    const newQuestion = {
      id: Date.now(),
      question,
      optionA,
      optionB,
      optionC,
      optionD,
      correctOption,
      mediaUrl,
      solution,
      difficulty,
      topic,
      subTopic,
    };

    if (editIndex !== null) {
      const updatedQuestions = [...questions];
      updatedQuestions[editIndex] = newQuestion;
      setQuestions(updatedQuestions);
      localStorage.setItem("questions", JSON.stringify(updatedQuestions));
      setEditIndex(null);
    } else {
      const updatedQuestions = [...questions, newQuestion];
      setQuestions(updatedQuestions);
      localStorage.setItem("questions", JSON.stringify(updatedQuestions));
    }

    setQuestion("");
    setOptionA("");
    setOptionB("");
    setOptionC("");
    setOptionD("");
    setSolution("");
    setDifficulty("");
    setTopic("");
    setSubTopic("");
  };

  const deleteQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const editQuestion = (index: number) => {
    const q = questions[index];
    setQuestion(q.question);
    setOptionA(q.optionA);
    setOptionB(q.optionB);
    setOptionC(q.optionC);
    setOptionD(q.optionD);
    setSolution(q.solution);
    setDifficulty(q.difficulty);
    setTopic(q.topic);
    setSubTopic(q.subTopic);
    setEditIndex(index);
  };

  const handleNext = async () => {
    if (questions.length === 0) {
      alert("Please add at least one question");
      return;
    }

    try {
      const payload = {
        questions: questions.map((q) => ({
          type: "mcq",
          question: q.question,
          option1: q.optionA,
          option2: q.optionB,
          option3: q.optionC,
          option4: q.optionD,
          correct_option: q.correctOption,
          explanation: q.solution,
          difficulty: q.difficulty.toLowerCase(),
          test_id: "test-uuid",
        })),
      };

      console.log("BULK QUESTIONS:", payload);
      await bulkCreateQuestions(payload);
    } catch (error) {
      console.log("Backend blocked request (CORS):", error);
    }

    navigate("/publish");
  };

  const TOTAL = 50;
  const currentNum = questions.length + 1;

  return (
    <div className="page-layout">
      <Sidebar />

      <div className="questions-container">
        <Header />

        {/* Top bar */}
        <div className="questions-topbar">
          <span className="breadcrumb">
            Test Creation &nbsp;/&nbsp; Create Test &nbsp;/&nbsp; Chapter Wise
          </span>
          <button className="publish-btn" onClick={() => navigate("/publish")}>
            Publish
          </button>
        </div>

        <div className="questions-page">

          {/* ── Left Panel ── */}
          <div className="question-sidebar">
            <div className="question-sidebar-header">
              <h3>Question creation</h3>
              <button className="collapse-btn" title="Collapse">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6" />
                  <polyline points="20 18 14 12 20 6" />
                </svg>
              </button>
            </div>

            <p className="total-questions-label">Total Questions : {TOTAL}</p>

            {questions.map((q, index) => (
              <div key={q.id} className="question-item-row">
                <button
                  className={`question-item${editIndex === index ? "" : ""}`}
                  onClick={() => editQuestion(index)}
                >
                  Question {index + 1}
                  <span className="question-item-arrow">›</span>
                </button>
                <div className="question-actions">
                  <button className="edit-btn" onClick={() => editQuestion(index)}>Edit</button>
                  <button className="delete-btn" onClick={() => deleteQuestion(index)}>Delete</button>
                </div>
              </div>
            ))}

            {/* Placeholder upcoming questions */}
            {Array.from({ length: Math.max(0, 2 - questions.length) }).map((_, i) => (
              <button key={`placeholder-${i}`} className="question-item question-item-inactive">
                Question {questions.length + i + 1}
                <span className="question-item-arrow">›</span>
              </button>
            ))}
          </div>

          {/* ── Right Content ── */}
          <div className="question-content">

            {/* Chapter Card */}
            <div className="chapter-card">
              <div className="chapter-card-top">
                <span className="chapter-type-badge">Chapter Wise</span>
                <button className="chapter-edit-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
              </div>

              <div className="chapter-title-row">
                <h3>Chapter 1</h3>
                <span className="difficulty-badge">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
                  </svg>
                  Easy
                </span>
              </div>

              <div className="chapter-meta">
                <span className="chapter-meta-key">Subject</span>
                <span>: &nbsp;English</span>

                <span className="chapter-meta-key">Topic</span>
                <span>
                  : &nbsp;
                  <span className="topic-tags">
                    <span className="topic-tag">Grammar</span>
                    <span className="topic-tag">Writing</span>
                  </span>
                </span>

                <span className="chapter-meta-key">Sub Topic</span>
                <span>
                  : &nbsp;
                  <span className="subtopic-tag">Application</span>
                </span>
              </div>

              <div className="chapter-stats">
                <span className="chapter-stat">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                  60 Min
                </span>
                <span className="stat-divider" />
                <span className="chapter-stat">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                  50 Q's
                </span>
                <span className="stat-divider" />
                <span className="chapter-stat">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                  250 Marks
                </span>
              </div>
            </div>

            {/* Question Header */}
            <div className="question-header">
              <p className="question-counter">
                Question {currentNum}/<span>{TOTAL}</span>
              </p>
              <div className="question-header-actions">
                <button className="mcq-btn" onClick={addQuestion}>+ MCQ</button>
                <button className="csv-btn">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  CSV
                </button>
              </div>
            </div>

            <button className="delete-all-btn">
              <TrashIcon /> Delete All Edits
            </button>

            {/* Question input with toolbar */}
            <div className="question-textarea-wrapper">
              <div className="rich-toolbar">
                {TOOLBAR.map((btn, i) =>
                  btn === null
                    ? <span key={i} className="toolbar-divider" />
                    : <button key={i} className="toolbar-btn" style={btn.style}>{btn.label}</button>
                )}
              </div>
              <textarea
                placeholder="Type here"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              <button className="textarea-trash"><TrashIcon /></button>
            </div>

            {/* Options */}
            <p className="options-label">Type the options below</p>
            <div className="options-section">
              {[
                { val: optionA, set: setOptionA, opt: "A" },
                { val: optionB, set: setOptionB, opt: "B" },
                { val: optionC, set: setOptionC, opt: "C" },
                { val: optionD, set: setOptionD, opt: "D" },
              ].map(({ val, set, opt }) => (
                <div key={opt} className="option-row">
                  <input
                    type="radio"
                    className="option-radio"
                    name="correctOption"
                    checked={correctOption === opt}
                    onChange={() => setCorrectOption(opt)}
                  />
                  <input
                    type="text"
                    className="option-input"
                    placeholder="Type Option here"
                    value={val}
                    onChange={(e) => set(e.target.value)}
                  />
                  <button className="option-trash"><TrashIcon /></button>
                </div>
              ))}
            </div>

            {/* Solution */}
            <p className="solution-label">Add Solution</p>
            <div className="solution-wrapper">
              <textarea
                placeholder="Type here"
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
              />
              <button className="solution-trash"><TrashIcon /></button>
            </div>

            {/* Question Settings */}
            <p className="settings-title">Question settings</p>
            <div className="settings-grid">
              <div className="settings-field">
                <label>Level of Difficulty</label>
                <div className="select-wrapper">
                  <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                    <option value="">Select from Drop-down</option>
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Difficult</option>
                  </select>
                </div>
              </div>

              <div className="settings-field">
                <label>Topic</label>
                <div className="select-wrapper">
                  <select value={topic} onChange={(e) => setTopic(e.target.value)}>
                    <option value="">Select from Drop-down</option>
                    <option>Grammar</option>
                    <option>Writing</option>
                    <option>Reading</option>
                    <option>Vocabulary</option>
                  </select>
                </div>
              </div>

              <div className="settings-field">
                <label>Sub-topic</label>
                <div className="select-wrapper">
                  <select value={subTopic} onChange={(e) => setSubTopic(e.target.value)}>
                    <option value="">Select from Drop-down</option>
                    <option>Application</option>
                    <option>Theory</option>
                    <option>Practice</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="button-row">
              <button className="cancel-btn" onClick={() => navigate("/create-test")}>
                Exit Test Creation
              </button>
              <div className="right-buttons">
                <button className="add-question-btn" onClick={addQuestion}>
                  Add Question
                </button>
                <button className="next-btn" onClick={handleNext}>
                  Next
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Questions;
