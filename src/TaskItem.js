import { useDispatch } from "react-redux";
import { deleteTask, toggleTask } from "./redux";
import dayjs from "dayjs";

const TaskItem = ({ task, selectedDate }) => {
  const dispatch = useDispatch();

  // 🔥 Calcul du retard en jours
  const daysLate = dayjs(selectedDate).diff(dayjs(task.date), "day");

  // 🔥 Déterminer la classe CSS selon le nombre de jours de retard
  let statusClass = "";
  if (task.done && dayjs(task.date).isSame(selectedDate, "day")) {
    statusClass = "done-today"; // ✅ Tâche terminée aujourd'hui => Verte
  } else if (!task.done) {
    if (daysLate === 1) {
      statusClass = "late-yellow"; // 🟡 1 jour de retard
    } else if (daysLate === 2) {
      statusClass = "late-orange"; // 🟠 2 jours de retard
    } else if (daysLate >= 3 && daysLate <= 4) {
      statusClass = "late-red-light"; // 🔴 3-4 jours de retard
    } else if (daysLate >= 5) {
      statusClass = "late-red-dark"; // 🔥 5 jours ou plus
    }
  }

  return (
    <div className={`task-item ${statusClass}`}>
      <label>
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => dispatch(toggleTask(task.id))}
        />
        {task.text}
        {daysLate >= 1 && !task.done && (
          <span className="late-text">
            ⚠ {daysLate} jour{daysLate > 1 ? "s" : ""} de retard
          </span>
        )}
        <span
          onClick={() => dispatch(deleteTask(task.id))}
          role="button"
          style={{ padding: "5px", marginLeft: "20px", cursor: "pointer" }}
        >
          X
        </span>
      </label>
    </div>
  );
};

export default TaskItem;
