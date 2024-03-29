import React from "react";
import { NavLink } from 'react-router-dom';

import styles from '../../assets/styles/main.module.css'

import TransitionPage from '../../components/transitionPage';
import Footer from '../footer';

const PageWrapper = ({children, meta, breadcrumb}) => {

  const newMeta = {
    ...{
      pageTitle: "Lorem ipsum",
      pageDescription: "Dolar sit amet in id aliquet ipsum, nec fermentum massa.",
      bodyClass: 'pageDefault'
    },
    ...meta
  }

  const { pageTitle, pageDescription, bodyClass } = newMeta;

  return (
    <main className={styles.main}>

      {/* <TransitionPage /> */}

      <div className={styles.firstSection}>

        {breadcrumb &&
          <div className={styles.breadcrumb}>
            <div className={styles.breadcrumbPrefix}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <NavLink to={"/admin"}>
                <span>Home</span>
              </NavLink>
            </div>
            <div className={styles.breadcrumbBody}>
              {Object.keys(breadcrumb).map((item, key) => {
                return (
                  <React.Fragment key={key}>
                    <div className={styles.breadcrumbSeparator}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                      </svg>
                    </div>
                    <div className={styles.breadcrumbItem}>
                      <NavLink to={breadcrumb[key].link}>
                        {breadcrumb[key].label}
                      </NavLink>
                    </div>
                  </React.Fragment>
                )
              })}
            </div>
          </div>
        }

        <div className={styles.mainTitle}>
          <h1 className={styles.h1}>{pageTitle}</h1>
        </div>

        <div className={styles.mainDescription}>
          <p>{pageDescription}</p>
        </div>

      </div>

      <div className={`${styles.pageDefault} ${styles.[bodyClass]}`}>
        {children}
      </div>

      <Footer />

    </main>
  );
}

export default PageWrapper;
