import { ArrowBigRight } from 'lucide-react';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './IntroSection.css';
import { AuthContext } from '../contexts/AuthContext';

const IntroSection = () => {
  const {checkIsAuthenticated} = useContext(AuthContext);
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
        <Link to={{pathname:"/ai/text-to-video"}}>
          <button>{checkIsAuthenticated() ? "Jump Back In" : "Start Generating"} <ArrowBigRight /> </button>
        </Link>
      </div>
    </motion.section>
  );
};

export default IntroSection;