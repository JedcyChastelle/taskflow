import { STATUS_LABEL, type Task } from "../types";

type Props = {
  task: Task;
  onCycle: (id: string) => void;
  onRemove: (id: string) => void;
};

export function TaskItem({ task, onCycle, onRemove }: Props) {
  return (
    <li className={`task task--${task.status}`}>
      <button
        type="button"
        className="task__status"
        onClick={() => onCycle(task.id)}
        title="Passer au statut suivant"
      >
        {STATUS_LABEL[task.status]}
      </button>
      <span className="task__title">{task.title}</span>
      <span className={`prio prio--${task.priority}`}>P{task.priority}</span>
      <button
        type="button"
        className="task__remove"
        onClick={() => onRemove(task.id)}
        aria-label={`Supprimer « ${task.title} »`}
      >
        ✕
      </button>
    </li>
  );
}