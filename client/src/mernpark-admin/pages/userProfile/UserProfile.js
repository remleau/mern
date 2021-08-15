import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from 'react-router-dom';

import PageWrapper from "../../components/pageWrapper";
import { getUserProfile } from '../../lib';

import styles from '../../assets/styles/main.module.css';


const UserProfile = ({ match }) => {
  const { register, handleSubmit, errors } = useForm();

  const user_id = parseInt(match.params.user_id) || false; 

  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserProfile(user_id).then((res) => {
      if (typeof res.data !== 'undefined') {
        setUser(res.data);
      } else if (res.error) {
        setError(res.error);
      }
    });
  }, [user_id]);

  const pageTitle = `${user?.firstName} ${user?.lastName} profile`;
  const meta = {
    pageTitle: pageTitle,
    pageDescription: "",
    bodyClass: 'pageUserProfil'
  }

  const breadcrumb = {
    0: {
      label: 'Settings',
      link: '/admin/settings'
    }
  }

  const onSubmit = (formData) => {
    console.log(formData)
  }

  if(error) {
    return (
      <Redirect to={"/admin"} />
    )
  }

  return (
    <PageWrapper meta={meta} breadcrumb={breadcrumb}>
      {user ? 
        <React.Fragment>

          <div className={styles.containerTitles}>
            <h1 className={styles.h1}>Modify your infos</h1>
          </div>

          <div>
            <form className={styles.formAddUser} onSubmit={handleSubmit(onSubmit)}>

              <div className={styles.formHalf}>
                <div className={styles.formDefaultInput}>
                  <label>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>First Name</span>
                  </label>
                  <input name="firstName" defaultValue={user.firstName} className={errors.firstName && styles.inputError} ref={register({ required: true })} />
                  {errors.firstName && <span className={styles.errorField}>This field is required</span>}
                </div>

                <div className={styles.formDefaultInput}>
                  <label>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Last Name</span>
                  </label>
                  <input name="lastName" defaultValue={user.lastName} className={errors.lastName && styles.inputError} ref={register({ required: true })} />
                  {errors.lastName && <span className={styles.errorField}>This field is required</span>}
                </div>
              </div>

              <div className={styles.formDefaultInput}>
                <label>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                  <span>Password</span>
                </label>
                <input name="password" defaultValue="" type="password" className={errors.password && styles.errorInput} ref={register({ required: true })} />
                {errors.password && <span className={styles.errorField}>This field is required</span>}
              </div>

              <button type="submit" className={styles.cta}>Modify</button>
            </form>
          </div>
        
        </React.Fragment>
      : error}
    </PageWrapper>
  );
}

export default UserProfile;
