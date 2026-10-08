import { useEffect, useRef, useState, type FormEvent } from "react";
import type { Priority } from "../types";

type Props = { onAdd: (title: string, priority: Priority) => void };

export function TaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>(2);
  const inputRef = useRef<HTMLInputElement>(null);

  // État dérivé : calculé à chaque rendu, jamais stocké dans un useState
  const error = title.length > 80 ? "80 caractères maximum" : null;

  // Au premier affichage, placer le curseur dans le champ
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title.trim() || error) return;
    onAdd(title.trim(), priority);
    setTitle("");
    inputRef.current?.focus(); // prêt pour la tâche suivante
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label htmlFor="new-task" className="sr-only">
        Nouvelle tâche
      </label>
      <input
        id="new-task"
        ref={inputRef}
        value={title}
        placeholder="Nouvelle tâche"
        onChange={(e) => setTitle(e.target.value)}
        aria-invalid={!!error}
        aria-describedby="new-task-error"
      />
      <select
        aria-label="Priorité"
        value={priority}
        onChange={(e) => setPriority(Number(e.target.value) as Priority)}
      >
        <option value={1}>Haute</option>
        <option value={2}>Moyenne</option>
        <option value={3}>Basse</option>
      </select>
      <button disabled={!title.trim() || !!error}>Ajouter</button>
      {error && (
        <p id="new-task-error" className="error" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}