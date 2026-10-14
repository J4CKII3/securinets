import { useEffect, useState } from 'react';
import clubLogo from '../assets/iteam/logo.jpg';
import Hero from '../components/home/Hero.jsx';
import Why from '../components/home/Why.jsx';
import Fields from '../components/home/Fields.jsx';
import CalendarSection from '../components/home/CalendarSection.jsx';
import BestOf from '../components/home/BestOf.jsx';

export default function Home() {
  const [introVisible, setIntroVisible] = useState(true);
  const [introMounted, setIntroMounted] = useState(true);

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => setIntroVisible(false), 800);
    const removeTimer = window.setTimeout(() => setIntroMounted(false), 1000);
    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  return (
    <>
      {introMounted && (
        <div
          className={`home-intro${introVisible ? '' : ' is-fading'}`}
          role="status"
          aria-label="Loading homepage"
        >
          <img src={clubLogo} alt="" aria-hidden="true" />
        </div>
      )}
      <Hero />
      <Why />
      <Fields />
      <CalendarSection />
      <BestOf />
    </>
  );
}
