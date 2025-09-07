'use client';

import React from 'react';
import { useRouter } from 'next/navigation'; // ✅ App Router-compatible
import styles from './AnimatedButton.module.css';

const AnimatedButton = ({ text = "Learn More" }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/my-services');
  };

  return (
    <button className={styles.glowBtn} onClick={handleClick}>
      {text}
      <span className={styles.glow}></span>
    </button>
  );
};

export default AnimatedButton;
