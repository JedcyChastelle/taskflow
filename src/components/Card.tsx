import type { ReactNode } from "react";

type CardProps = {
  title: string;
  actions?: ReactNode; // slot nommé
  children: ReactNode; // slot par défaut
};

export function Card({ title, actions, children }: CardProps) {
  return (
    <article className="card">
      <header className="card__header">
        <h2>{title}</h2>
        {actions}
      </header>
      <div className="card__body">{children}</div>
    </article>
  );
}