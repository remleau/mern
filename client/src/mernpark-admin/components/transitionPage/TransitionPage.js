import React, { useState, useEffect } from "react";

import styles from '../../assets/styles/main.module.css';

const TransitionPage = () => {
  const [classes, setClasses] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setClasses('animate')
    }, 250);

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <section className={`${styles.transitionPage} ${styles.[classes]}`}>
      <div>
        MernPark
      </div>
    </section>
  );
}

export default TransitionPage;
