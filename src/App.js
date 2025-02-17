import { useEffect, useState } from "react";
import "./styles.css";
import TaskForm from "./TaskForm";
import TasksHeader from "./TasksHeader";
import TasksList from "./TasksList";
import { useDispatch, useSelector } from "react-redux";

export default function App() {
  return (
    <div className="container">
      <article>
        <TasksHeader />
        <TasksList />
        <footer>
          <TaskForm />
        </footer>
      </article>
    </div>
  );
}
