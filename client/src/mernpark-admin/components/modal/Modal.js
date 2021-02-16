import React, { useState, forwardRef, useImperativeHandle } from "react";
import styles from '../../assets/styles/main.module.css';

const Modal = forwardRef((props ,ref) => {
  const [display, setDisplay] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      openModal: () => open(),
      closeModal: () => close(),
    }
  });

  const open = () => {
    setDisplay(true)
  }

  const close = () => {
    setDisplay(false);
  }

  return (
    <div ref={ref} className={`${styles.modal} ${styles.[props.dataClass]} ${(display ? styles.block : styles.hidden)}`}>

      <button onClick={() => setDisplay(false)} className={`${styles.close}`}>
        <span>Close</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div>{props.children}</div>

    </div>
  );
});

export default Modal;