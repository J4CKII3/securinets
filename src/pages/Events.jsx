import { events } from '../data/events.js';
import SawShowcase from '../components/home/SawShowcase.jsx';
import FriendlyCtf from '../components/home/FriendlyCtf.jsx';

export default function Events() {
  return (
    <>
      <div className="container page">
        <header className="page-head">
          <h1>Events</h1>
        </header>

        {events.map((ev) => {
          const hasDetails = ev.date || ev.place;
          return (
            <article className="event" key={ev.name}>
              <h2>{ev.name}</h2>
              {ev.blurb && <p className="event-blurb">{ev.blurb}</p>}
              {hasDetails ? (
                <dl className="event-meta">
                  {ev.date && (
                    <div>
                      <dt>Date</dt>
                      <dd>{ev.date}</dd>
                    </div>
                  )}
                  {ev.place && (
                    <div>
                      <dt>Place</dt>
                      <dd>{ev.place}</dd>
                    </div>
                  )}
                </dl>
              ) : null}
              {ev.link && (
                <a className="btn btn-primary" href={ev.link} target="_blank" rel="noopener noreferrer">
                  {ev.linkLabel || 'Learn more'}
                </a>
              )}
              {ev.name === 'SAW 1.0' && <SawShowcase />}
            </article>
          );
        })}
      </div>
      <FriendlyCtf />
    </>
  );
}
