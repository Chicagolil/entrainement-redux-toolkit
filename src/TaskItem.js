import { useDispatch } from "react-redux";
import { deleteTask, toggleTask } from "./redux";
import dayjs from "dayjs";
import "dayjs/locale/fr";

const TaskItem = ({ task, selectedDate }) => {
  const dispatch = useDispatch();

  const isOverdue =
    !task.done && dayjs(task.date).isBefore(selectedDate, "day");

  return (
    <div className={`task-item ${isOverdue ? "overdue" : ""}`}>
      <label>
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => dispatch(toggleTask(task.id))}
        />
        {task.text} ({task.date})
        {isOverdue && <span className="overdue-text"> ⚠ En retard</span>}
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
