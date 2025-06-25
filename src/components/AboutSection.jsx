// AboutSection.jsx
import React from 'react';
import './AboutSection.css';
import about_sec_image from '../assets/About_Section_img.jpeg';
import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <section className='aboutSection' id='about'>
      <motion.h2
        className="sectionTitle"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        About Prompt2Play
      </motion.h2>

      <div className="sectionContent">
        <motion.div
        className="imgCon"
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
        >
          <img src={about_sec_image} alt="about_sec_img" />
        </motion.div>

        <motion.div
          className="content"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h1>Your Complete Video Studio in the Browser</h1>
          <h4>Seamlessly create, publish, and download high-quality videos.</h4>
          <h4>Transform raw ideas into professional-grade content using our intelligent, AI-powered video engine.</h4>
          <h4>Avoid the hassle of complicated software — everything happens right in your browser, effortlessly.</h4>
          <h4>Let AI handle scripting, scene generation, transitions, and even voiceovers, saving you hours of work.</h4>
          <h4>Perfectly built for content creators, educators, startups, and marketing teams who need videos fast.</h4>
          <h4>Prompt2Play brings your imagination to life with precision, speed, and unmatched creative flexibility.</h4>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
