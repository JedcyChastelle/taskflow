import { useState, type FormEvent } from "react";

type Props = { onAdd: (title: string) => void };

export function TaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  // État dérivé : calculé à chaque rendu, jamais stocké dans un useState
  const error = title.length > 80 ? "80 caractères maximum" : null;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title.trim() || error) return;
    onAdd(title.trim());
    setTitle("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label htmlFor="new-task" className="sr-only">
        Nouvelle tâche
      </label>
      <input
        id="new-task"
        value={title}
        placeholder="Nouvelle tâche"
        onChange={(e) => setTitle(e.target.value)}
        aria-invalid={!!error}
        aria-describedby="new-task-error"
      />
      <button disabled={!title.trim() || !!error}>Ajouter</button>
      {error && (
        <p id="new-task-error" className="error" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}