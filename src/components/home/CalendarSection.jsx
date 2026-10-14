import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { calendarEvents } from '../../data/calendar.js';
import { pad, parseKey, toKey, todayKey } from '../../lib/dates.js';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const monthFmt = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' });
const dayFmt = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long' });
const shortFmt = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short' });

function buildCells(year, month) {
  const offset = (new Date(year, month, 1).getDay() + 6) % 7; // week starts on Monday
  const total = new Date(year, month + 1, 0).getDate();
  const cells = Array(offset).fill(null);
  for (let d = 1; d <= total; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

function EventItem({ event }) {
  const startTime = parseKey(event.date).getTime();
  const [now, setNow] = useState(() => Date.now());
  const finished = startTime <= now;
  const hasPhotos = finished && event.photosUrl;
  const workshopLink = finished && event.type === 'workshop' && event.workshopPath;
  const status = event.type === 'break'
    ? 'Study break'
    : !finished
    ? 'Upcoming'
    : workshopLink
      ? 'View workshop'
      : hasPhotos
        ? 'View photos'
        : 'Finished';

  useEffect(() => {
    if (event.type === 'break' || finished) return undefined;
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [event.type, finished]);

  const secondsRemaining = Math.max(0, Math.floor((startTime - now) / 1000));
  const days = Math.floor(secondsRemaining / 86400);
  const hours = Math.floor((secondsRemaining % 86400) / 3600);
  const minutes = Math.floor((secondsRemaining % 3600) / 60);
  const seconds = secondsRemaining % 60;

  const content = (
    <>
      <span className={`mk mk-${event.type}`} aria-hidden="true" />
      <span className="ev-body">
        <span className="ev-title">{event.title}</span>
        <span className="ev-meta">
          {shortFmt.format(parseKey(event.date))}, {event.type}
        </span>
        {!finished && event.type !== 'break' && (
          <span className="ev-countdown">
            Starts in {String(days).padStart(2, '0')} days {String(hours).padStart(2, '0')}h{' '}
            {String(minutes).padStart(2, '0')}m {String(seconds).padStart(2, '0')}s
          </span>
        )}
      </span>
      <span className="ev-status">{status}</span>
    </>
  );

  if (workshopLink) {
    const search = new URLSearchParams({
      path: event.workshopPath,
      ...(event.workshopPhotoId && { scrollTo: event.workshopPhotoId }),
    });

    return (
      <Link className="ev ev-link" to={`/workshops?${search}`}>
        {content}
      </Link>
    );
  }

  return hasPhotos ? (
    <a className="ev ev-link" href={event.photosUrl} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    <div className="ev">{content}</div>
  );
}

export default function CalendarSection() {
  const today = todayKey();
  const initialDate = parseKey(today);
  const [view, setView] = useState({ y: initialDate.getFullYear(), m: initialDate.getMonth() });
  const [selected, setSelected] = useState(null);

  const byDate = useMemo(() => {
    const map = {};
    calendarEvents.forEach((e) => {
      if (!map[e.date]) map[e.date] = [];
      map[e.date].push(e);
    });
    return map;
  }, []);

  const cells = buildCells(view.y, view.m);
  const monthPrefix = `${view.y}-${pad(view.m + 1)}-`;
  const monthEvents = calendarEvents
    .filter((e) => e.date.startsWith(monthPrefix))
    .sort((a, b) => a.date.localeCompare(b.date));
  const listed = selected ? byDate[selected] || [] : monthEvents;
  const monthLabel = monthFmt.format(new Date(view.y, view.m, 1));
  const showStudyBreak = view.y === 2026 && (view.m === 9 || view.m === 10);

  const shift = (delta) => {
    setSelected(null);
    setView((v) => {
      const n = new Date(v.y, v.m + delta, 1);
      return { y: n.getFullYear(), m: n.getMonth() };
    });
  };

  return (
    <section className="section cal-section" id="calendar" aria-labelledby="cal-title">
      <div className="container">
        <div className="section-head">
          <h2 id="cal-title" className="h2">
            Calendar
          </h2>
          <p className="section-note">Workshops and competitions. Finished events link to their photos.</p>
        </div>

        <div className="cal-layout">
          <div className="cal">
            {showStudyBreak && (
              <p className="cal-break-note">
                Study break · 28 October–15 November — because we care about you.
              </p>
            )}
            <div className="cal-bar">
              <h3>{monthLabel}</h3>
              <div className="cal-nav">
                <button type="button" onClick={() => shift(-1)} aria-label="Previous month">
                  <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
                    <path d="M12.5 4 6.5 10l6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button type="button" onClick={() => shift(1)} aria-label="Next month">
                  <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
                    <path d="m7.5 4 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="cal-grid">
              {WEEKDAYS.map((w) => (
                <span key={w} className="cal-wd">
                  {w}
                </span>
              ))}
              {cells.map((d, i) => {
                if (d === null) return <span key={i} className="cal-blank" />;
                const key = toKey(view.y, view.m, d);
                const evs = byDate[key];
                const cls = `cal-day${key === today ? ' is-today' : ''}`;
                if (!evs) {
                  return (
                    <span key={i} className={cls}>
                      {d}
                    </span>
                  );
                }
                return (
                  <button
                    key={i}
                    type="button"
                    className={`${cls} has-events${selected === key ? ' is-selected' : ''}`}
                    aria-pressed={selected === key}
                    aria-label={`${dayFmt.format(parseKey(key))}: ${evs.map((e) => e.title).join(', ')}`}
                    onClick={() => setSelected((s) => (s === key ? null : key))}
                  >
                    {d}
                    <span className="cal-marks" aria-hidden="true">
                      {evs.map((e, j) => (
                        <i key={j} className={`mk mk-${e.type}`} />
                      ))}
                    </span>
                  </button>
                );
              })}
            </div>

            <ul className="cal-legend" aria-label="Legend">
              <li>
                <i className="mk mk-workshop" aria-hidden="true" /> Workshop
              </li>
              <li>
                <i className="mk mk-competition" aria-hidden="true" /> Competition
              </li>
              <li>
                <i className="mk mk-break" aria-hidden="true" /> Study break
              </li>
            </ul>
          </div>

          <div className="cal-list" aria-live="polite">
            <div className="cal-list-head">
              <h3>{selected ? dayFmt.format(parseKey(selected)) : monthLabel}</h3>
              {selected && (
                <button type="button" className="link-btn" onClick={() => setSelected(null)}>
                  Show whole month
                </button>
              )}
            </div>
            {listed.length > 0 ? (
              <ul>
                {listed.map((e) => (
                  <li key={e.date + e.title}>
                    <EventItem event={e} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="empty">
                {selected
                  ? 'Nothing is scheduled on this day.'
                  : 'No sessions this month. Use the arrows to look at another month.'}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
