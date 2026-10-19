import { Card } from "../components/Card";
import { FocusTimer } from "../components/FocusTimer";

export function AboutPage() {
  return (
    <section>
      <h1>À propos</h1>
      <p className="muted">
        TaskFlow : gestion de projets et de tâches en React + TypeScript, avec React
        Router et une API json-server. Projet du module React + Next.js, M2 ESIEE-IT.
      </p>
      <Card title="Concentration">
        <FocusTimer />
      </Card>
    </section>
  );
}