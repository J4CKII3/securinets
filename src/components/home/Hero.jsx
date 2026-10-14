import { Link } from 'react-router-dom';
import homepageBackground from '../../assets/iteam/bg.png';
import homepageVideo from '../../assets/iteam/bgvid.mp4';

export default function Hero() {
  return (
    <section className="hero">
      <video
        className="hero-video"
        src={homepageVideo}
        poster={homepageBackground}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
      />
      <div className="hero-video-shade" aria-hidden="true" />
      <img className="hero-background" src={homepageBackground} alt="" aria-hidden="true" />

      <div className="container hero-copy">
        <h1>
          {['Break it.', 'Understand it.', 'Secure it.'].map((text, i) => (
            <span className="line" key={text}>
              <span style={{ '--i': i }}>{text}</span>
            </span>
          ))}
        </h1>
        <p className="hero-lede">
          Welcome to Securinets, Tunisia’s first and largest student-led cybersecurity association. 
          We are a national network of passionate students, ethical hackers, and tech enthusiasts dedicated to shaping the future of digital security
        </p>
        <div className="hero-actions">
          <Link to="/workshops" className="btn btn-primary">
            Explore workshops
          </Link>
          <Link to="/ctf" className="btn btn-ghost">
            What is a CTF?
          </Link>
        </div>
      </div>
    </section>
  );
}
