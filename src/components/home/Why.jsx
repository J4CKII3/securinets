const reasons = [
  {
    title: 'Build a strong foundation',
    text: 'Start with how systems, networks and code really work, so the advanced topics have something solid to stand on.',
  },
  {
    title: 'Challenge yourself',
    text: 'Join our workshops and competitions, and test what you know against real problems.',
  },
  {
    title: 'Connect to experts',
    text: 'Explore internships and job opportunities through our network.',
  },
];

export default function Why() {
  return (
    <section className="section why" aria-labelledby="why-title">
      <div className="container why-grid">
        <h2 id="why-title" className="h2">
          Why Securinets
        </h2>
        <ul className="why-list">
          {reasons.map((r) => (
            <li key={r.title}>
              <h3>{r.title}</h3>
              <p>{r.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
