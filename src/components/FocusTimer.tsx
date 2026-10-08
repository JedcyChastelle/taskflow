import { useEffect, useState } from "react";

const DURATION = 25 * 60; // 25 minutes, en secondes

// Minuteur « Pomodoro » : 25 minutes de concentration sur une tâche
export function FocusTimer() {
  const [secondsLeft, setSecondsLeft] = useState(DURATION);
  const [running, setRunning] = useState(false);

  // Valeur dérivée : démarré ET il reste du temps
  const active = running && secondsLeft > 0;

  useEffect(() => {
    if (!active) return; // à l'arrêt : pas de minuteur
    const id = setInterval(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);
    // Nettoyage : arrêt à la pause, à 00:00 ou au démontage
    return () => clearInterval(id);
  }, [active]);

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div className="timer">
      <span className="timer__time">
        {minutes}:{seconds}
      </span>
      <button
        type="button"
        onClick={() => setRunning(!running)}
        disabled={secondsLeft === 0}
      >
        {active ? "Pause" : "Démarrer"}
      </button>
      <button
        type="button"
        onClick={() => {
          setRunning(false);
          setSecondsLeft(DURATION);
        }}
      >
        Réinitialiser
      </button>
    </div>
  );
}