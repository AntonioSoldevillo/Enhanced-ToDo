import { useState, useEffect } from "react";

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, { text: task, completed: false }]);
    setTask("");
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleComplete = (index) => {
    setTasks(
      tasks.map((t, i) =>
        i === index ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditText(tasks[index].text);
  };

  const saveEdit = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = editText;
    setTasks(updatedTasks);
    setEditingIndex(null);
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "pending") return !t.completed;
    return true;
  });

  return (
    <div className="app-container">
      <h2>To-Do List</h2>
      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
      <input
        type="text"
        placeholder="Add a new task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>

      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
      </div>

      <ul>
        {filteredTasks.map((t, index) => (
          <li key={index} style={{ textDecoration: t.completed ? "line-through" : "none" }}>
            {editingIndex === index ? (
              <>
                <input value={editText} onChange={(e) => setEditText(e.target.value)} />
                <button onClick={() => saveEdit(index)}>Save</button>
              </>
            ) : (
              <>
                <input type="checkbox" checked={t.completed} onChange={() => toggleComplete(index)} />
                {t.text}
                <button onClick={() => startEditing(index)}>Edit</button>
                <button onClick={() => removeTask(index)}>❌</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
