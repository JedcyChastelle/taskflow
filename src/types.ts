export type Status = "todo" | "doing" | "done";
export type Priority = 1 | 2 | 3;
export type Filter = "all" | Status;

export type Project = { id: string; name: string; description: string };
export type Task = {
  id: string;
  projectId: string;
  title: string;
  status: Status;
  priority: Priority;
};

// Données pour créer : sans id (généré par le serveur)
export type NewProject = Omit<Project, "id">;
export type NewTask = Omit<Task, "id">;

// Projet avec ses tâches (réponse de /projects?_embed=tasks)
export type ProjectWithTasks = Project & { tasks: Task[] };

export const STATUS_LABEL: Record<Status, string> = {
  todo: "À faire",
  doing: "En cours",
  done: "Terminé",
};

// todo → doing → done → todo
export const nextStatus = (s: Status): Status =>
  s === "todo" ? "doing" : s === "doing" ? "done" : "todo";