import { useEffect, useState } from "react";
import { Link } from "react-router";
import { api } from "../api";
import { ErrorMessage } from "../components/ErrorMessage";
import { Loading } from "../components/Loading";
import type { ProjectWithTasks } from "../types";

export function ProjectsPage() {
  // Les trois états d'un chargement : en cours, erreur, données
  const [projects, setProjects] = useState<ProjectWithTasks[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false; // true si la page est quittée avant
    api
      .getProjects()
      .then((data) => {
        if (!ignore) setProjects(data);
      })
      .catch(() => {
        if (!ignore) setError("Impossible de charger les projets.");
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, []); // [] : une seule fois, à l'arrivée sur la page

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section>
      <div className="page-header">
        <h1>Projets</h1>
        <Link to="/projects/new" className="button">
          + Nouveau projet
        </Link>
      </div>
      {projects.length === 0 && <p className="muted">Aucun projet pour l'instant.</p>}
      <ul className="project-grid">
        {projects.map((p) => {
          const done = p.tasks.filter((t) => t.status === "done").length;
          return (
            <li key={p.id}>
              <Link to={`/projects/${p.id}`} className="project-card">
                <h2>{p.name}</h2>
                <p className="muted">{p.description}</p>
                <p className="small">
                  {done} / {p.tasks.length} tâche(s) terminée(s)
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}