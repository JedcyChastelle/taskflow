import { useEffect, useState } from "react";
import { Link } from "react-router";
import { api, ApiError } from "../api";
import { Card } from "../components/Card";
import { ErrorMessage } from "../components/ErrorMessage";
import { FilterBar } from "../components/FilterBar";
import { Loading } from "../components/Loading";
import { TaskForm } from "../components/TaskForm";
import { TaskList } from "../components/TaskList";
import { nextStatus, type Filter, type Priority, type Project, type Task } from "../types";
import { NotFoundPage } from "./NotFoundPage";

type Props = { id: string };

export function ProjectPage({ id }: Props) {
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    // Le projet et ses tâches, demandés en parallèle
    Promise.all([api.getProject(id), api.getTasks(id)])
      .then(([p, t]) => {
        if (ignore) return;
        setProject(p);
        setTasks(t);
      })
      .catch((e) => {
        if (ignore) return;
        if (e instanceof ApiError && e.status === 404) setNotFound(true);
        else setError("Impossible de charger le projet.");
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, [id]);

  // Modifier : l'API d'abord, PUIS l'état avec la réponse
  async function add(title: string, priority: Priority) {
    try {
      const created = await api.createTask({
        projectId: id,
        title,
        status: "todo",
        priority,
      });
      setTasks((prev) => [...prev, created]);
    } catch {
      setError("La tâche n'a pas pu être ajoutée.");
    }
  }

  async function cycle(taskId: string) {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;
    try {
      const updated = await api.updateTask(taskId, { status: nextStatus(task.status) });
      setTasks((prev) => prev.map((t) => (t.id === taskId ? updated : t)));
    } catch {
      setError("Le statut n'a pas pu être modifié.");
    }
  }

  async function remove(taskId: string) {
    try {
      await api.deleteTask(taskId);
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
    } catch {
      setError("La tâche n'a pas pu être supprimée.");
    }
  }

  if (loading) return <Loading />;
  if (notFound) return <NotFoundPage />;
  if (!project) return <ErrorMessage message={error ?? "Projet indisponible."} />;

  const visible = filter === "all" ? tasks : tasks.filter((t) => t.status === filter);

  return (
    <section>
      <Link to="/" className="small">
        ← Tous les projets
      </Link>
      <h1>{project.name}</h1>
      <p className="muted">{project.description}</p>
      {error && <ErrorMessage message={error} />}
      <Card title="Tâches" actions={<FilterBar value={filter} onChange={setFilter} />}>
        <TaskForm onAdd={add} />
        <TaskList tasks={visible} onCycle={cycle} onRemove={remove} />
      </Card>
    </section>
  );
}