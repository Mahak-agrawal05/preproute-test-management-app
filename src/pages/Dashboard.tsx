import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTests } from "../services/testService";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import "../styles/Dashboard.css";

interface Test {
  id: string;
  name: string;
  subject: string;
  topics: string[];
  status: string;
  created_at: string;
}

function Dashboard() {
  const navigate = useNavigate();

  const [tests, setTests] = useState<Test[]>([]);

  useEffect(() => {
    getTests()
      .then((res) => {
        console.log("TESTS:", res);
        setTests(res.data);
      })
      .catch((err) => {
        console.log("TEST ERROR:", err);
      });
  }, []);

  const handleDelete = (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this test?"
    );
    if (!confirmDelete) return;
    const updatedTests = tests.filter((test) => test.id !== id);
    setTests(updatedTests);
  };

  const getStatusClass = (status: string) => {
    switch (status?.toLowerCase()) {
      case "published": return "status-badge published";
      case "draft":     return "status-badge draft";
      case "scheduled": return "status-badge scheduled";
      default:          return "status-badge";
    }
  };

  return (
    <div className="page-layout">
      <Sidebar />

      <div className="dashboard-container">
        <Header />

        <div className="dashboard-top">
          <h1 className="dashboard-title">All Tests</h1>
          <button
            className="create-btn"
            onClick={() => navigate("/create-test")}
          >
            + Create New Test
          </button>
        </div>

        <div className="test-list">
          {tests.length === 0 && (
            <div className="empty-state">
              <p>No tests found. Create your first test to get started.</p>
            </div>
          )}

          {tests.map((test) => (
            <div className="test-card" key={test.id}>
              <div className="test-info">
                <h3 className="test-name">{test.name}</h3>

                <div className="test-meta">
                  <span className="meta-item">
                    <span className="meta-label">Subject</span>
                    <span className="meta-value">{test.subject}</span>
                  </span>

                  <span className="meta-divider" />

                  <span className="meta-item">
                    <span className="meta-label">Created</span>
                    <span className="meta-value">
                      {new Date(test.created_at).toLocaleDateString()}
                    </span>
                  </span>

                  <span className="meta-divider" />

                  <span className={getStatusClass(test.status)}>
                    {test.status}
                  </span>
                </div>
              </div>

              <div className="action-buttons">
                <button
                  className="action-btn view-btn"
                  onClick={() => navigate("/publish")}
                >
                  View
                </button>
                <button
                  className="action-btn edit-btn"
                  onClick={() => navigate(`/create-test/${test.id}`)}
                >
                  Edit
                </button>
                <button
                  className="action-btn delete-btn"
                  onClick={() => handleDelete(test.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
