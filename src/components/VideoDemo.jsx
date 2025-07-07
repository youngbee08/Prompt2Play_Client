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
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            playsInline
            autoPlay
            muted
            loop
            width="100%"
            style={{
              pointerEvents:"none"
            }}
            />
      </div>
    </motion.section>
  );
};

export default VideoDemo;