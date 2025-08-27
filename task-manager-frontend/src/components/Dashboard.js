// src/components/Dashboard.js
import { useState, useEffect, useCallback } from "react";
import { getTasks, addTask, deleteTask, toggleTask } from "../api";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fetchTasks = useCallback(async () => {
    try {
      const res = await getTasks(token);
      setTasks(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    fetchTasks();
  }, [fetchTasks, navigate, token]);

  const handleAddTask = async () => {
    if (!newTask) return;

    const today = new Date();
    const selectedDate = dueDate ? new Date(dueDate) : null;

    if (selectedDate && selectedDate < today.setHours(0, 0, 0, 0)) {
      alert("Due date cannot be in the past!");
      return;
    }

    try {
      await addTask({ title: newTask, dueDate }, token);
      setNewTask("");
      setDueDate("");
      fetchTasks();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id, token);
      fetchTasks();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const handleToggleTask = async (id, taskDueDate, completed) => {
    const today = new Date();
    if (!completed && taskDueDate && new Date(taskDueDate) < today.setHours(0, 0, 0, 0)) {
      alert("Cannot mark task completed after its due date!");
      return;
    }

    try {
      await toggleTask(token, id);
      fetchTasks();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <header>
        <h1>Task Manager</h1>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </header>

      <div className="add-task-container">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button className="add-btn" onClick={handleAddTask}>Add Task</button>
      </div>

      <div className="tasks-list">
        {tasks.map((task) => {
          const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();
          return (
            <div key={task._id} className={`task-card ${task.completed ? "completed" : ""} ${isOverdue ? "overdue" : ""}`}>
              <div className="task-info">
                <h3>{task.title}</h3>
                <p>Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No date"}</p>
              </div>
              <div className="task-actions">
                {!task.completed && (
                  <button
                    className="complete-btn"
                    onClick={() =>
                      handleToggleTask(task._id, task.dueDate, task.completed)
                    }
                  >
                    Mark Completed
                  </button>
                )}
                <button className="delete-btn" onClick={() => handleDeleteTask(task._id)}>Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
