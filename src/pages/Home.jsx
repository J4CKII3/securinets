import { useEffect, useState } from 'react';
import introImage from '../assets/iteam/bg.png';
import Hero from '../components/home/Hero.jsx';
import Why from '../components/home/Why.jsx';
import Fields from '../components/home/Fields.jsx';
import CalendarSection from '../components/home/CalendarSection.jsx';
import BestOf from '../components/home/BestOf.jsx';

export default function Home() {
  const [introVisible, setIntroVisible] = useState(true);
  const [introMounted, setIntroMounted] = useState(true);

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => setIntroVisible(false), 1800);
    const removeTimer = window.setTimeout(() => setIntroMounted(false), 2000);
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
          <img src={introImage} alt="" aria-hidden="true" />
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
