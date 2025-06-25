import React from 'react';
import './VideoDemo.css';
import { motion } from 'framer-motion';

const VideoDemo = () => {
  return (
    <motion.section
      className="videoDemo"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    //   viewport={{ once: true }}
    >
      <h2>See It In Action</h2>
      <div className="videoWrapper">
            <video
            src="https://sora.chatgpt.com/g/gen_01jygcy4w9eh5bb7p5vwbzkkch"
            controls
            playsInline
            autoPlay
            muted
            loop
            width="100%"
            />
      </div>
    </motion.section>
  );
};

export default VideoDemo;