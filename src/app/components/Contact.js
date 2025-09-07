'use client';

import React from 'react';
import { useRouter } from 'next/navigation'; // ✅ App Router-compatible
import styles from './AnimatedButton.module.css';

const AnimatedButton = ({ text = "Contact Us" }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/contact-us');
  };

  return (
    <button className={styles.glowBtn} onClick={handleClick}>
      {text}
      <span className={styles.glow}></span>
    </button>
  );
};

export default AnimatedButton;
