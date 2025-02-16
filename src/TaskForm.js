import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "./redux";

const TaskForm = () => {
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addTask({ text, date }));
    setText("");
    setDate("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Ajouter une tâche"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <label> Ajouter une date</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input type="submit" value="Ajouter" />
    </form>
  );
};

export default TaskForm;
