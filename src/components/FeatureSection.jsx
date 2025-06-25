import React from 'react';
import './FeatureSection.css';
import { Zap, FileText, DownloadCloud, Brain } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  { icon: <Zap />, title: 'Fast Rendering', desc: 'Render AI-generated videos in minutes with blazing speed.' },
  { icon: <Brain />, title: 'AI-Powered', desc: 'Harness artificial intelligence to turn prompts into powerful videos.' },
  { icon: <FileText />, title: 'Prompt to Scene', desc: 'Type your idea and let the system build scenes automatically.' },
  { icon: <DownloadCloud />, title: 'Download Ready', desc: 'Easily export and download your videos for any use.' },
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
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const FeatureSection = () => {
  return (
    <section className="featureSection">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Powerful Features
      </motion.h2>

      <motion.div
        className="featuresGrid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {features.map((item, i) => (
          <motion.div className="featureCard" key={i} variants={cardVariants} whileHover={{ y: -10 }}>
            <div className="icon">{item.icon}</div>
            <h4>{item.title}</h4>
            <p>{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default FeatureSection;
