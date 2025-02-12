import { useSelector } from "react-redux";

const TasksHeader = () => {
  const { tasks, status } = useSelector((state) => state.todoo);

  if (status === "loading") {
    return (
      <header>
        <h1>Chargement des tâches...</h1>
      </header>
    );
  }

  if (status === "failed") {
    return (
      <header>
        <h1>Erreur lors du chargement des tâches !</h1>
      </header>
    );
  }

  const undoneTasks = tasks.filter((t) => !t.done);

  return (
    <header>
      <h1>React Todo List</h1>
      <p>
        Tâches à faire : <strong>{undoneTasks.length}</strong>
      </p>
    </header>
  );
};

export default TasksHeader;
