import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchTasks } from "./redux/tasksSlice";
import TaskItem from "./TaskItem";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import "./App.css";
import { deleteCategories, fetchCategories } from "./redux/categorieSlice";

dayjs.locale("fr");

const TasksList = () => {
  const dispatch = useDispatch();
  const { tasks, status, error } = useSelector((state) => state.todoo);
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchCategories());
  }, [dispatch]);
  if (status === "loading") return <p>Chargement...</p>;
  if (status === "failed") return <p>Erreur : {error}</p>;

  const changeDay = (offset) => {
    setSelectedDate(
      dayjs(selectedDate).add(offset, "day").format("YYYY-MM-DD")
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (task.date === selectedDate) return true;

    return !task.done && dayjs(task.date).isBefore(selectedDate);
  });

  return (
    <>
      <div
        className="changerDate"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "10px",
        }}
      >
        <h1 onClick={() => changeDay(-1)}>◀ </h1>
        <h2>{dayjs(selectedDate).format("DD MMMM YYYY")}</h2>
        <h1 onClick={() => changeDay(1)}> ▶</h1>
      </div>
      {filteredTasks.length > 0 ? (
        filteredTasks.map((t) => (
          <TaskItem task={t} key={t.id} selectedDate={selectedDate} />
        ))
      ) : (
        <p>Aucune tâche pour ce jour.</p>
      )}
    </>
  );
};

export default TasksList;
