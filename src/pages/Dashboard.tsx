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

    const updatedTests = tests.filter(
      (test) => test.id !== id
    );

    setTests(updatedTests);
  };

  return (
    <div className="page-layout">

      <Sidebar />

      <div className="dashboard-container">

        <Header />

        <div className="dashboard-top">

          <h1>All Tests</h1>

          <button
            className="create-btn"
            onClick={() => navigate("/create-test")}
          >
            + Create New Test
          </button>

        </div>

        <div className="test-list">

          {tests.map((test) => (
            <div className="test-card" key={test.id}>

              <div className="test-info">

                <h3>{test.name}</h3>

                <p>
                  <strong>Subject:</strong> {test.subject}
                </p>

                <p>
                  <strong>Status:</strong> {test.status}
                </p>

                <p>
                  <strong>Created:</strong>{" "}
                  {new Date(test.created_at).toLocaleDateString()}
                </p>

              </div>

              <div className="action-buttons">

                <button
                  className="view-btn"
                  onClick={() => navigate("/publish")}
                >
                  View
                </button>

                <button
                  className="edit-btn"
                  onClick={() =>
                    navigate(`/create-test/${test.id}`)
                  }
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    navigate(`/create-test/${test.id}`)
                  }
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