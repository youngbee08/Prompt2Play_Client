import React from 'react';
import './Footer.css';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <p>&copy; {new Date().getFullYear()} Prompt2Play. All rights reserved.</p>
      <p>
        Built with ❤️ by Bamitale Abdul-Azeem Irebami —
        <a href="https://github.com/youngbee08" target="_blank" rel="noopener noreferrer"> GitHub</a>
      </p>
    </motion.footer>
  );
};

export default Footer;
