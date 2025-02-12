import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchTasks } from "./redux";
import TaskItem from "./TaskItem";

const TasksList = () => {
  const dispatch = useDispatch();
  const { tasks, status, error } = useSelector((state) => state.todoo);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (status === "loading") return <p>Chargement...</p>;
  if (status === "failed") return <p>Erreur : {error}</p>;

  return (
    <>
      {tasks.map((t) => (
        <TaskItem task={t} key={t.id} />
      ))}
    </>
  );
};

export default TasksList;
