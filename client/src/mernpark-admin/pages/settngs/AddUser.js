import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import styles from '../../assets/styles/main.module.css';

import { addUser, socketInstance } from '../../lib';
import FormError from '../../components/form';
import PageWrapper from "../../components/pageWrapper";

const AddUser = () => {
  const [teams, setTeams] = useState();
  const [errorForm, setErrorForm] = useState();
  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    socketInstance.emit('getAllTeams');

    socketInstance.on('getAllTeams', data => {
      setTeams(JSON.parse(data));
    });
  }, [])

  const meta = {
    pageTitle: `Add new user`,
    bodyClass: 'pageCreateUser'
  }

  const breadcrumb = {
    0: {
      label: 'Settings',
      link: '/admin/settings'
    }
  }

  const onSubmit = (formData) => {
    addUser(formData).then((res) => {
      res && setErrorForm({
        type: res?.type || 'undefined',
        label: res?.error || '',
        data: res?.data || {}
      })
      socketInstance.emit('getAllUsers');
    });
  }

  return (
    <PageWrapper meta={meta} breadcrumb={breadcrumb}>

      <div className={styles.containerTitles}>
        <h1 className={styles.h1}>Formulaire</h1>
        <h3 className={styles.h3}>Aliquam posuere eros, donec pretium dignissim volutpat</h3>
      </div>

      <div>
        <form className={styles.formAddUser} onSubmit={handleSubmit(onSubmit)}>
          <FormError errors={errorForm} />

          <div className={styles.formHalf}>
            <div className={styles.formDefaultInput}>
              <label>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>First name</span>
              </label>
              <input name="firstName" defaultValue="Rémy" className={errors.firstName && styles.errorInput} ref={register({ required: true })} />
              {errors.firstName && <span className={styles.errorField}>This field is required</span>}
            </div>

            <div className={styles.formDefaultInput}>
              <label>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Last name</span>
              </label>
              <input name="lastName" defaultValue="Groleau" className={errors.lastName && styles.errorInput} ref={register({ required: true })} />
              {errors.lastName && <span className={styles.errorField}>This field is required</span>}
            </div>
          </div>

          <div className={styles.formHalf}>
            <div className={styles.formDefaultInput}>
              <label>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Username</span>
              </label>
              <input name="username" defaultValue="remleau" className={errors.username && styles.errorInput} ref={register({ required: true })} />
              {errors.username && <span className={styles.errorField}>This field is required</span>}
            </div>

            <div className={styles.formDefaultInput}>
              <label>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>E-mail</span>
              </label>
              <input name="email" type="email" defaultValue="remleau@gmail.com" className={errors.email && styles.errorInput} ref={register({ required: true })} />
              {errors.email && <span className={styles.errorField}>This field is required</span>}
            </div>
          </div>

          <div className={styles.formDefaultInput}>
            <label>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
              <span>Team</span>
            </label>
            <select name="team_id" ref={register({ required: true })}>
              <option value="0" defaultValue="0">No team</option>
              {teams && Object.keys(teams).map(function (key) {
                return (
                  <option key={key} value={teams[key].team_id}>
                    {teams[key].team_name}
                  </option>
                )
              })}
            </select>
            {errors.team_id && <span className={styles.errorField}>This field is required</span>}
          </div>

          <div className={styles.formDefaultInput}>
            <label>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
              <span>Password</span>
            </label>
            <input name="password" defaultValue="allo1234" type="password" className={errors.password && styles.errorInput} ref={register({ required: true })} />
            {errors.password && <span className={styles.errorField}>This field is required</span>}
          </div>

          <button type="submit" className={styles.cta}>Add User</button>
        </form>
      </div>

    </PageWrapper>
  );
}

export default AddUser;
