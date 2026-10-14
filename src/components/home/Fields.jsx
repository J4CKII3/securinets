import { Link } from 'react-router-dom';
import { paths } from '../../data/paths.js';

export default function Fields() {
  return (
    <section className="section" aria-labelledby="fields-title">
      <div className="container">
        <div className="section-head">
          <h2 id="fields-title" className="h2">
            What we work on
          </h2>
          <p className="section-note">Pick a category to see the learning path.</p>
        </div>
        <ul className="fields-grid">
          {paths.map((p) => (
            <li key={p.slug}>
              <Link to={`/workshops?path=${p.slug}`} className="field-tile">
                {p.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
