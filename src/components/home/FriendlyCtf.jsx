import { Link } from 'react-router-dom';

export default function FriendlyCtf() {
  return (
    <section className="friendly-ctf" aria-labelledby="friendly-ctf-title">
      <div className="container">
        <div className="friendly-ctf-card">
          <div>
            <p className="friendly-ctf-label">Coming soon</p>
            <h2 id="friendly-ctf-title" className="h2">
              Friendly CTF
            </h2>
            <p className="friendly-ctf-copy">Keep an eye on the calendar for details.</p>
          </div>
          <Link className="btn btn-primary" to="/?scrollTo=calendar">
            See more
          </Link>
        </div>
      </div>
    </section>
  );
}
