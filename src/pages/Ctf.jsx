import { useState } from 'react';

const columns = ['Web', 'Crypto', 'Forensics', 'Reverse'];
const points = [100, 200, 300, 400];

function Scoreboard() {
  const [solved, setSolved] = useState(() => new Set());

  const toggle = (key) =>
    setSolved((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });

  const score = [...solved].reduce((sum, key) => sum + Number(key.split(':')[1]), 0);

  return (
    <div className="board-wrap">
      <p className="board-hint">Try it: solve challenges and watch the score add up. Harder ones are worth more.</p>
      <div className="board">
        {columns.map((c) => (
          <span key={c} className="board-col">
            {c}
          </span>
        ))}
        {points.map((p) =>
          columns.map((c) => {
            const key = `${c}:${p}`;
            const on = solved.has(key);
            return (
              <button
                key={key}
                type="button"
                className={`board-cell${on ? ' is-solved' : ''}`}
                aria-pressed={on}
                aria-label={`${c}, ${p} points`}
                onClick={() => toggle(key)}
              >
                {p}
              </button>
            );
          })
        )}
      </div>
      <div className="board-foot">
        <p aria-live="polite">
          Team score <strong>{score}</strong>
        </p>
        <button type="button" className="link-btn" onClick={() => setSolved(new Set())}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default function Ctf() {
  return (
    <div className="container page">
      <header className="page-head">
        <h1>Discover the world of Capture The Flag</h1>
        <p>Straight answers to the questions people ask before their first competition.</p>
      </header>

      <section className="split">
        <h2>What is a CTF?</h2>
        <div className="split-body">
          <p>
            A Capture The Flag is a cybersecurity competition made of puzzles. Each puzzle imitates a
            situation from real security work, such as a vulnerable website, a broken cipher or a
            suspicious disk image, and hides a secret string called the flag. Find it, submit it, and
            earn points.
          </p>
          <p>
            You can play alone or in a team. Whoever solves the most, and solves it fastest, climbs the
            scoreboard.
          </p>
        </div>
      </section>

      <section className="split">
        <h2>How does it work?</h2>
        <div className="split-body">
          <p>
            Challenges are grouped by topic: cryptography, web, forensics, reverse engineering and more.
            To get a flag you exploit a weakness, decode a message or study evidence. Harder challenges
            are worth more points, and the total decides the ranking.
          </p>
          <p>
            Teams usually split the board by speciality and share progress along the way, because the
            clock never stops.
          </p>
          <Scoreboard />
        </div>
      </section>

      <section className="split">
        <h2>Why participate?</h2>
        <div className="split-body">
          <p>
            A CTF is the quickest way to feel what security work is like. You solve problems with a
            clock running, learn to share the work inside a team, and practise thinking clearly when you
            are stuck.
          </p>
          <p>
            You also meet other players and experts, pick up techniques that courses rarely cover, and
            gain hands-on experience whether you are just starting out or already working in the field.
          </p>
        </div>
      </section>
    </div>
  );
}
