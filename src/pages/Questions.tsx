import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import "../styles/Questions.css";

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

      localStorage.setItem(
        "questions",
        JSON.stringify(updatedQuestions)
      );

      setEditIndex(null);

    } else {

      const updatedQuestions = [
        ...questions,
        newQuestion,
      ];

      setQuestions(updatedQuestions);

      localStorage.setItem(
        "questions",
        JSON.stringify(updatedQuestions)
      );
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
    setQuestions(
      questions.filter((_, i) => i !== index)
    );
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
  const handleNext = () => {

    if (questions.length === 0) {
      alert(
        "Please add at least one question"
      );
      return;
    }

    navigate("/publish");
  };

  return (
    <div className="page-layout">

      <Sidebar />

      <div className="questions-container">

        <Header />

        <div className="questions-page">

          {/* Left Panel */}

          <div className="question-sidebar">

            <h3>Total Questions : 50</h3>

            {questions.map((q, index) => (
              <div key={q.id}>

                <button
                  className="question-item"
                >
                  Question {index + 1}
                </button>

                <div className="question-actions">

                  <button
                    className="edit-btn"
                    onClick={() => editQuestion(index)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteQuestion(index)}
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))}

          </div>

          {/* Right Panel */}

          <div className="question-content">

            <div className="chapter-card">

              <h3>Chapter 1</h3>

              <p>
                Subject: English
              </p>

              <p>
                Topic: Grammar, Writing
              </p>

              <p>
                Sub Topic: Application
              </p>

              <div className="chapter-stats">
                <span>60 Minutes</span>
                <span>50 Questions</span>
                <span>250 Marks</span>
              </div>

            </div>

            <h2>Question Creation</h2>

            <div className="form-group">
              <label>Question</label>

              <textarea
                rows={5}
                placeholder="Enter Question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>

            <div className="options-section">

              <input
                type="text"
                placeholder="Option A"
                value={optionA}
                onChange={(e) => setOptionA(e.target.value)}
              />

              <input
                type="text"
                placeholder="Option B"
                value={optionB}
                onChange={(e) => setOptionB(e.target.value)}
              />

              <input
                type="text"
                placeholder="Option C"
                value={optionC}
                onChange={(e) => setOptionC(e.target.value)}
              />

              <input
                type="text"
                placeholder="Option D"
                value={optionD}
                onChange={(e) => setOptionD(e.target.value)}
              />

            </div>

            <div className="form-group">
              <label>Correct Option</label>

              <select
                value={correctOption}
                onChange={(e) =>
                  setCorrectOption(e.target.value)
                }
              >
                <option value="">
                  Select Correct Option
                </option>

                <option value="A">Option A</option>
                <option value="B">Option B</option>
                <option value="C">Option C</option>
                <option value="D">Option D</option>
              </select>
            </div>

            <div className="form-group">
              <label>Solution</label>

              <textarea
                rows={4}
                placeholder="Enter Solution"
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Media URL (Optional)</label>

              <input
                type="text"
                placeholder="Enter Media URL"
                value={mediaUrl}
                onChange={(e) =>
                  setMediaUrl(e.target.value)
                }
              />
            </div>

            <div className="settings-grid">

              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="">
                  Select Difficulty
                </option>

                <option>Easy</option>
                <option>Medium</option>
                <option>Difficult</option>

              </select>

              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              >
                <option value="">
                  Select Topic
                </option>

                <option>Grammar</option>
                <option>Writing</option>
                <option>Reading</option>
                <option>Vocabulary</option>

              </select>

              <select
                value={subTopic}
                onChange={(e) => setSubTopic(e.target.value)}
              >
                <option value="">
                  Select Sub Topic
                </option>

                <option>Application</option>
                <option>Theory</option>
                <option>Practice</option>

              </select>

            </div>

            <div className="button-row">

              <button
                className="cancel-btn"
                onClick={() => navigate("/create-test")}
              >
                Exit Test Creation
              </button>

              <button
                className="add-question-btn"
                onClick={addQuestion}
              >
                Add Question
              </button>

              <button
                className="next-btn"
                onClick={handleNext}
              >
                Next
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Questions;