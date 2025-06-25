import { ArrowBigRight } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './IntroSection.css';

const IntroSection = () => {
  return (
    <motion.section
      className='section'
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="content">
        <h1>Turn Ideas into Pro-Videos Instantly</h1>
        <h4>AI-powered video creation that helps teams work smarter, not harder.</h4>
      </div>
      <div className="actionBtn">
        <Link to={{pathname:"/generate"}}>
          <button>Get Started for Free <ArrowBigRight /> </button>
        </Link>
      </div>
    </motion.section>
  );
};

export default IntroSection;