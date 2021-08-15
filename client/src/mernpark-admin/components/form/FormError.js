import React from "react";
import styles from '../../assets/styles/main.module.css';

const FormError = (props) => {

  const {errors} = props;

  return (
    <React.Fragment>
      { errors && 
        <div className={`${styles.formMessage} ${styles.[errors.type]}`}>
          <p>{errors.label}</p>
        </div>
      }
    </React.Fragment>
  )
}

export default FormError;