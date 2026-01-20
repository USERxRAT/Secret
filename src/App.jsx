import { useEffect, useRef, useState } from "react";
import LightPillar from "./LightPillar";
import "./App.css";

export default function App() {
  const [showCard, setShowCard] = useState(false);
  const [glow, setGlow] = useState(0.002);
  const noBtnRef = useRef(null);

  /* Background Music */
  useEffect(() => {
  const music = new Audio("/bg-music.mp3");
  music.loop = true;
  music.volume = 0.25; // start at audible level

  const playMusic = () => {
    music.play().catch((err) => console.log("Music play failed:", err));
    window.removeEventListener("click", playMusic);
  };

  // wait for user interaction
  window.addEventListener("click", playMusic);

  return () => {
    window.removeEventListener("click", playMusic);
    music.pause();
  };
}, []);

  /* Optional glow pulse for interaction */
  const typeSound = useRef(new Audio("/type.mp3"));
  typeSound.current.volume = 0.15;

  const pulseGlow = () => {
    typeSound.current.currentTime = 0;
    typeSound.current.play();
    setGlow(0.006);
    setTimeout(() => setGlow(0.002), 80);
  };

  /* Dodge No Button */
  const dodge = () => {
    if (!noBtnRef.current) return;
    const btn = noBtnRef.current;
    const parent = btn.parentElement.getBoundingClientRect();

    const x = Math.random() * (parent.width - 100);
    const y = Math.random() * (parent.height - 50);

    btn.style.transform = `translate(${x}px, ${y}px)`;
  };

  /* Show card after short delay */
  useEffect(() => {
    const timer = setTimeout(() => setShowCard(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="page center">
      {/* Background */}
      <LightPillar
        topColor="#5227FF"
        bottomColor="#FF9FFC"
        glowAmount={glow}
        intensity={1}
        rotationSpeed={0.3}
        interactive={false}
      />

      {/* Floating Hearts */}
      <div className="hearts">
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i}>💖</span>
        ))}
      </div>

      {/* Content */}
      <div className="container fade show">
        <h1 className="main-text">
          Hey You 💕 I have a tiny confession...
        </h1>

        <div className={`card fade ${showCard ? "show" : ""}`}>
          <p>I’ve had a little crush on you for a while now 😳</p>
          <p>Valentine’s Day felt like the perfect moment to ask...</p>
          <p> I dare you to say no(jk jk)</p>
          <button
            onClick={() =>
              window.open("https://forms.gle/gp8EwCzznMmuF6Z89", "_blank")
            }
            onMouseEnter={pulseGlow}
          >
            Yes 😊
          </button>

          <button
            ref={noBtnRef}
            className="no-btn"
            onMouseEnter={dodge}
            onTouchStart={dodge}
          >
            No 🙃
          </button>
        </div>

        <footer>Made by Lyran Booys 💖</footer>
      </div>
    </div>
  );
}
