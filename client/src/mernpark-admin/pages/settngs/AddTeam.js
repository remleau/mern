import React, { useState } from "react";
import { useForm } from "react-hook-form";

import styles from '../../assets/styles/main.module.css';

import { addTeam, socketInstance } from '../../lib';
import FormError from '../../components/form';
import PageWrapper from "../../components/pageWrapper";

const AddTeam = () => {
  const [errorForm, setErrorForm] = useState();
  const { register, handleSubmit, errors } = useForm();

  const meta = {
    pageTitle: `Add new team`,
    bodyClass: 'pageCreateTeam'
  }

  const breadcrumb = {
    0: {
      label: 'Settings',
      link: '/admin/settings'
    }
  }

  const onSubmit = (formData) => {
    addTeam(formData).then((res) => {
      res && setErrorForm({
        type: res.data.type,
        label: res.data.label
      });
      socketInstance.emit('getAllTeams');
    });
  }

  return (
    <PageWrapper meta={meta} breadcrumb={breadcrumb}>

      <div className={styles.containerTitles}>
        <h1 className={styles.h1}>Formulaire</h1>
        <h3 className={styles.h3}>Aliquam posuere eros, donec pretium dignissim volutpat</h3>
      </div>

      <div>
        <form className={styles.formAddTeam} onSubmit={handleSubmit(onSubmit)}>
          <FormError errors={errorForm} />

          <div className={styles.formDefaultInput}>
            <label>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span>Team name</span>
            </label>
            <input name="teamName" defaultValue="" className={errors.teamName && styles.errorInput} ref={register({ required: true })} />
            {errors.teamName && <span className={styles.errorField}>This field is required</span>}
          </div>

          <button type="submit" className={styles.cta}>Add Team</button>
        </form>
      </div>

    </PageWrapper>
  );
}

export default AddTeam;
