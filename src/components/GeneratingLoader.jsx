import React, { useEffect, useState } from 'react';
import './GeneratingLoader.css';
import { Sparkles } from 'lucide-react';

const messages = [
  "Crafting your masterpiece...",
  "Good things take time...",
  "Almost there...",
  "Making magic happen...",
  "Polishing the pixels..."
];

const GeneratingLoader = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 4000); // Change message every 4s
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="generating-spinner">
      <div className="sparkle-container">
        <div className="sparkle">✨</div>
        <div className="sparkle">✨</div>
        <div className="sparkle">✨</div>
        <div className="sparkle">✨</div>
      </div>
      <div className="generating-text">
        {messages[index]}
      </div>
    </div>
  );
};

export default GeneratingLoader;
