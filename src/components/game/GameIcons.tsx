import React from 'react';
import { motion, Variants } from 'framer-motion';
// 定义图标出现的动画变体 (variants)
// hidden: 初始状态，��全透明且缩放为0
// visible: 可见状态，完全不透明且缩放为1，带有弹簧动画效果
const iconVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring', // 使用弹簧动画，使其有弹性效果
      stiffness: 300,
      damping: 20,
    },
  },
};
/**
 * 'X' 玩家的图标���件
 * 使用 SVG 绘制一个圆角的 'X'
 * 使用 Framer Motion 实现一个从无到有的弹出动画
 */
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
      stroke="#3B82F6" // 蓝色
      strokeWidth="16"
      strokeLinecap="round" // 圆角线头
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
/**
 * 'O' 玩家的图标组件
 * 使用 SVG 绘制一个圆形的 'O'
 * 使用 Framer Motion 实现一个从无到有的弹出动画
 */
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
      stroke="#FBBF24" // 黄色
      strokeWidth="16"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </motion.svg>
);