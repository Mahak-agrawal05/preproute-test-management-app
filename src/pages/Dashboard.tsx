import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import "../styles/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

const [tests, setTests] = useState([
  {
    id: 1,
    name: "English Grammar Test",
    subject: "English",
    status: "Draft",
    createdDate: "05 Jun 2026",
  },
  {
    id: 2,
    name: "Mathematics Mock Test",
    subject: "Mathematics",
    status: "Live",
    createdDate: "04 Jun 2026",
  },
]);

const handleDelete = (id: number) => {

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
                  <strong>Created:</strong> {test.createdDate}
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
                  onClick={() => navigate("/create-test")}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
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