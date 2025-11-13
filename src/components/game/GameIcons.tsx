import React from 'react';
import { motion } from 'framer-motion';
const iconVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
  },
};
export const IconX: React.FC = () => (
  <motion.svg
    width="100"
    height="100"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
    variants={iconVariants}
    initial="hidden"
    animate="visible"
  >
    <path
      d="M20 20L80 80"
      stroke="#3B82F6"
      strokeWidth="16"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M80 20L20 80"
      stroke="#3B82F6"
      strokeWidth="16"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </motion.svg>
);
export const IconO: React.FC = () => (
  <motion.svg
    width="100"
    height="100"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
    variants={iconVariants}
    initial="hidden"
    animate="visible"
  >
    <circle
      cx="50"
      cy="50"
      r="30"
      stroke="#FBBF24"
      strokeWidth="16"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </motion.svg>
);