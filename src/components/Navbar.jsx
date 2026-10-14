import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { site } from '../data/site.js';
import clubLogo from '../assets/iteam/logo.jpg';

const links = [
  ['/', 'Home'],
  ['/workshops', 'Workshops'],
  ['/ctf', 'CTF'],
  ['/events', 'Events'],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link to="/" className="brand" aria-label={`${site.name} home`}>
          <img className="brand-logo" src={clubLogo} alt="" loading="eager" />
          <span>{site.name}</span>
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">Menu</span>
          <span className="bars" aria-hidden="true" />
        </button>

        <nav id="primary-nav" className={`nav-links${open ? ' is-open' : ''}`} aria-label="Primary">
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === '/'}>
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
