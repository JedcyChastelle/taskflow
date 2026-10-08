import { useEffect, useState } from "react";
import { Card } from "./components/Card";
import { FilterBar } from "./components/FilterBar";
import { FocusTimer } from "./components/FocusTimer";
import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";
import { ThemeToggle } from "./components/ThemeToggle";
import { ThemeProvider } from "./context/ThemeContext";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { nextStatus, type Filter, type Priority, type Task } from "./types";

// Tâches d'exemple, utilisées seulement si rien n'est encore sauvegardé
const INITIAL_TASKS: Task[] = [
  { id: "t1", title: "Installer Node.js 22", status: "done", priority: 1 },
  { id: "t2", title: "Lire la doc de useEffect", status: "doing", priority: 2 },
  { id: "t3", title: "Terminer le TP2", status: "todo", priority: 1 },
];

function Board() {
  // Tâches sauvegardées dans le navigateur (hook personnalisé)
  const [tasks, setTasks] = useLocalStorage<Task[]>("taskflow-tasks", INITIAL_TASKS);
  const [filter, setFilter] = useState<Filter>("all");

  // États dérivés : calculés pendant le rendu, jamais dupliqués dans un useState
  const visible = filter === "all" ? tasks : tasks.filter((t) => t.status === filter);
  const remaining = tasks.filter((t) => t.status !== "done").length;

  // Synchroniser le titre de l'onglet avec les tâches restantes
  useEffect(() => {
    document.title = remaining > 0 ? `(${remaining}) TaskFlow` : "TaskFlow";
  }, [remaining]);

  function add(title: string, priority: Priority) {
    setTasks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), title, status: "todo", priority },
    ]);
  }

  const cycle = (id: string) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: nextStatus(t.status) } : t)),
    );

  const remove = (id: string) => setTasks((prev) => prev.filter((t) => t.id !== id));

  return (
    <main className="app">
      <header className="topbar">
        <h1>
          TaskFlow <small>{remaining} restante(s)</small>
        </h1>
        <ThemeToggle />
      </header>
      <Card title="Concentration">
        <FocusTimer />
      </Card>
      <Card title="Mes tâches" actions={<FilterBar value={filter} onChange={setFilter} />}>
        <TaskForm onAdd={add} />
        <TaskList tasks={visible} onCycle={cycle} onRemove={remove} />
      </Card>
    </main>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Board />
    </ThemeProvider>
  );
}