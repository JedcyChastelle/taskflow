import type { NewProject, NewTask, Project, ProjectWithTasks, Task } from "./types";

// L'adresse de json-server, écrite une seule fois
const API_URL = "http://localhost:3001";

// Une erreur qui garde le code HTTP (pour reconnaître un 404)
export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

// fetch + vérification + JSON : écrit une fois pour tous les appels
async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(API_URL + path, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  // fetch ne lève pas d'erreur sur un 404 : on vérifie nous-mêmes
  if (!response.ok) {
    throw new ApiError(response.status, `Erreur ${response.status} sur ${path}`);
  }
  return (await response.json()) as T;
}

// Une fonction par opération : aucune URL dans les composants
export const api = {
  getProjects: () => request<ProjectWithTasks[]>("/projects?_embed=tasks"),
  getProject: (id: string) => request<Project>(`/projects/${id}`),
  createProject: (data: NewProject) =>
    request<Project>("/projects", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  getTasks: (projectId: string) => request<Task[]>(`/tasks?projectId=${projectId}`),
  createTask: (data: NewTask) =>
    request<Task>("/tasks", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateTask: (id: string, changes: Partial<Task>) =>
    request<Task>(`/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify(changes),
    }),
  deleteTask: (id: string) => request<Task>(`/tasks/${id}`, { method: "DELETE" }),
};