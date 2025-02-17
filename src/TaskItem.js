import { useDispatch } from "react-redux";
import { deleteTask, toggleTask } from "./redux/tasksSlice";
import dayjs from "dayjs";

const TaskItem = ({ task, selectedDate }) => {
  const dispatch = useDispatch();

  const daysLate = dayjs(selectedDate).diff(dayjs(task.date), "day");

  let statusClass = "";
  if (task.done && dayjs(task.date).isSame(selectedDate, "day")) {
    statusClass = "done-today";
  } else if (!task.done) {
    if (daysLate === 1) {
      statusClass = "late-yellow";
    } else if (daysLate === 2) {
      statusClass = "late-orange";
    } else if (daysLate >= 3 && daysLate <= 4) {
      statusClass = "late-red-light";
    } else if (daysLate >= 5) {
      statusClass = "late-red-dark";
    }
  }

  return (
    <div className={`task-item ${statusClass}`}>
      <span>
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => dispatch(toggleTask(task.id))}
          style={{ padding: "12px", marginRight: "20px", cursor: "pointer" }}
        />
      </span>
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
    </div>
  );
};

export default TaskItem;
