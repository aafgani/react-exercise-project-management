import { useState } from "react";

export default function NewTask({ onAdd }) {
  const [task, setTask] = useState("");

  const handleClick = () => {
    onAdd(task);
    setTask("");
  };

  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        className="w-64 px-2 py-1 rounded-sm bg-stone-200"
        onChange={(e) => setTask(e.target.value)}
        value={task}
      />
      <button
        className="text-stone-700 hover:text-stone-950"
        onClick={handleClick}
      >
        Add Task
      </button>
    </div>
  );
}
