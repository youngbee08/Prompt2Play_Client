import React, { useState } from 'react';
import './FaqSection.css';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: "What is Prompt2Play?",
    answer: "It's an AI tool that lets you create videos from text prompts with ease."
  },
  {
    question: "Is it free to use?",
    answer: "Yes! Creating and downloading videos is free for all users during development."
  },
  {
    question: "Do I need experience to use it?",
    answer: "No video editing experience is required. Just type your prompt and go."
  }
];

const FaqSection = () => {
  const [active, setActive] = useState(null);

  const toggle = (index) => {
    setActive(active === index ? null : index);
  };

  return (
    <section className="faqSection">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Frequently Asked Questions
      </motion.h2>
      <div className="faqList">
        {faqs.map((item, index) => (
          <motion.div
            key={index}
            className="faqItem"
            onClick={() => toggle(index)}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <h4>{item.question}</h4>
            <AnimatePresence>
              {active === index && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {item.answer}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FaqSection;
