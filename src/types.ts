export type Status = "todo" | "doing" | "done";
export type Priority = 1 | 2 | 3;
export type Task = { id: string; title: string; status: Status; priority: Priority };
export type Filter = "all" | Status;

export const STATUS_LABEL: Record<Status, string> = {
  todo: "À faire",
  doing: "En cours",
  done: "Terminé",
};

// todo → doing → done → todo
export const nextStatus = (s: Status): Status =>
  s === "todo" ? "doing" : s === "doing" ? "done" : "todo";