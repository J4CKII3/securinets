import { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Workshops from './pages/Workshops.jsx';
import Ctf from './pages/Ctf.jsx';
import Events from './pages/Events.jsx';

function ScrollToTop() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    const targetId = new URLSearchParams(search).get('scrollTo');
    if (!targetId) {
      window.scrollTo(0, 0);
      return undefined;
    }

    const frame = window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [pathname, search]);
  return null;
}

// HashRouter keeps routing working on any static host without server configuration.
export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workshops" element={<Workshops />} />
          <Route path="/ctf" element={<Ctf />} />
          <Route path="/events" element={<Events />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </HashRouter>
  );
}
