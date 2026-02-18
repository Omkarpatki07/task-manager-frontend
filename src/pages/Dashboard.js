import { useEffect, useState, useContext } from "react";
import API from "../api";
import KanbanBoard from "../components/KanbanBoard";
import { io } from "socket.io-client";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { logout, role } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();

    const socket = io("http://localhost:5000");
    socket.on("taskUpdated", fetchTasks);

    return () => socket.disconnect();
  }, []);

  const fetchTasks = async () => {
    const { data } = await API.get("/tasks");
    setTasks(data);
  };

  const handleCreateTask = async () => {
    if (!title) return;

    await API.post("/tasks", {
      title,
      description,
    });

    setTitle("");
    setDescription("");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div style={containerStyle}>
      {/* HEADER */}
      <header style={headerStyle}>
        <div>
          <h2 style={{ margin: 0 }}>Task Management Dashboard</h2>
          <span style={roleBadge(role)}>
            {role?.toUpperCase()}
          </span>
        </div>

        <button onClick={handleLogout} style={logoutButtonStyle}>
          Logout
        </button>
      </header>

      {/* CREATE TASK BOX */}
      <div style={createBoxStyle}>
        <input
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
        />
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={inputStyle}
        />
        <button onClick={handleCreateTask} style={buttonStyle}>
          Create Task
        </button>
      </div>

      <KanbanBoard tasks={tasks} />
    </div>
  );
}

const containerStyle = {
  minHeight: "100vh",
  background: "#f4f6f9",
  padding: "20px",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
};

const createBoxStyle = {
  display: "flex",
  gap: "10px",
  marginBottom: "20px",
  background: "white",
  padding: "15px",
  borderRadius: "8px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
};

const inputStyle = {
  padding: "10px",
  flex: 1,
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  padding: "10px 20px",
  background: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const logoutButtonStyle = {
  padding: "8px 15px",
  background: "#dc3545",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

/* 🎨 Role Badge Dynamic Styling */
const roleBadge = (role) => {
  let bgColor = "#6c757d";

  if (role === "admin") bgColor = "#dc3545";
  if (role === "manager") bgColor = "#fd7e14";
  if (role === "user") bgColor = "#28a745";

  return {
    display: "inline-block",
    marginTop: "5px",
    padding: "4px 10px",
    borderRadius: "20px",
    background: bgColor,
    color: "white",
    fontSize: "12px",
    fontWeight: "bold",
  };
};

export default Dashboard;
