import React from 'react';
import './HowItWorks.css';
import { motion } from 'framer-motion';

const steps = [
  { step: '1', title: 'Enter Prompt', desc: 'Start by typing your creative idea or script.' },
  { step: '2', title: 'AI Generates', desc: 'Watch as AI transforms your prompt into scene visuals.' },
  { step: '3', title: 'Render & Download', desc: 'Render the video and download it instantly.' },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

const HowItWorks = () => {
  return (
    <section className="howItWorks">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        How It Works
      </motion.h2>

      <motion.div
        className="steps"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {steps.map((s, i) => (
          <motion.div className="stepCard" key={i} variants={cardVariants} whileHover={{ y: -5 }}>
            <div className="stepNumber">{s.step}</div>
            <h4>{s.title}</h4>
            <p>{s.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default HowItWorks;