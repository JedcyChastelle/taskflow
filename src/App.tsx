import { useState } from "react";
import { Card } from "./components/Card";
import { FilterBar } from "./components/FilterBar";
import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";
import { nextStatus, type Filter, type Task } from "./types";

const INITIAL_TASKS: Task[] = [
  { id: "t1", title: "Installer Node.js 22", status: "done", priority: 1 },
  { id: "t2", title: "Lire la doc de useState", status: "doing", priority: 2 },
  { id: "t3", title: "Terminer le TP1", status: "todo", priority: 1 },
];

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [filter, setFilter] = useState<Filter>("all");

  // États dérivés : calculés pendant le rendu, jamais dupliqués dans un useState
  const visible = filter === "all" ? tasks : tasks.filter((t) => t.status === filter);
  const remaining = tasks.filter((t) => t.status !== "done").length;

  // Mises à jour sans mutation : on crée toujours un nouveau tableau
  const add = (title: string) =>
    setTasks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), title, status: "todo", priority: 2 },
    ]);

  const cycle = (id: string) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: nextStatus(t.status) } : t)),
    );

  const remove = (id: string) => setTasks((prev) => prev.filter((t) => t.id !== id));

  return (
    <main className="app">
      <h1>
        TaskFlow <small>{remaining} restante(s)</small>
      </h1>
      <Card title="Mes tâches" actions={<FilterBar value={filter} onChange={setFilter} />}>
        <TaskForm onAdd={add} />
        <TaskList tasks={visible} onCycle={cycle} onRemove={remove} />
      </Card>
    </main>
  );
}