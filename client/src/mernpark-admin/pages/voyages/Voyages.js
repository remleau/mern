import React, { useState } from "react";
import { Redirect } from 'react-router-dom';

import styles from '../../assets/styles/main.module.css';

import PageWrapper from "../../components/pageWrapper";

const Voyages = () => {
  const [voyage, setVoyage] = useState(false);

  const meta = {
    pageTitle: "Voyages",
    pageDescription: "In id aliquet ipsum, nec fermentum massa. Cras ultricies ultricies vestibulum."
  }

  const addVoyage = (e) => {
    e.stopPropagation();
    setVoyage(true);
  }

  if (voyage) {
    const min = 12345;
    const max = 654321;
    const rand = min + ( Math.random() * (max - min));

    return (
      <Redirect to={`/admin/voyages/a/${parseInt(rand)}`} />
    )
  }

  return (
    <PageWrapper meta={meta}>

      <div className={styles.containerTitle}>
        <h3 className={styles.h3}>List of voyages</h3>
        <div>
          <button className={styles.cta} onClick={(e) => addVoyage(e)}>
            <span>Add a new Adventure</span>
          </button>
        </div>
      </div>

    </PageWrapper>
  );
}

export default Voyages;
