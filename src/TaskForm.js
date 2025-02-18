import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "./redux/tasksSlice";
import dayjs from "dayjs";

const TaskForm = () => {
  const [text, setText] = useState("");
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [category, setCategory] = useState("Toutes");
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addTask({ text, date, category }));
    setText("");
    setDate(dayjs().format("YYYY-MM-DD"));
    setCategory("Toutes");
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
      <label>
        Ajouter une Catégorie
        <select onChange={(e) => setCategory(e.target.value)}>
          <option value="" disabled>
            Sélectionner une catégorie...
          </option>
          {categories.categories.map((category) => {
            return (
              <option name={category.nom} key={category.id}>
                {category.nom}
              </option>
            );
          })}
        </select>
      </label>
      <input type="submit" value="Ajouter" />
    </form>
  );
};

export default TaskForm;
