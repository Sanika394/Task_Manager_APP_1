import React, { useState, useEffect } from 'react';
import API from '../api';
import TaskForm from './TaskForm';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const { data } = await API.get('/tasks');
    setTasks(data);
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const markComplete = async (id) => {
    await API.patch(`/tasks/${id}/complete`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h2>My Tasks</h2>
      <TaskForm onTaskAdded={fetchTasks} />
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title} {task.completed && '✅'}
            <button onClick={() => markComplete(task._id)}>Complete</button>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
