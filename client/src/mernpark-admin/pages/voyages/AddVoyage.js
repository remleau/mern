import React, { useState } from "react";
import { useForm } from "react-hook-form";

import styles from '../../assets/styles/main.module.css';

import PageWrapper from "../../components/pageWrapper";
import { submitVoyage } from '../../lib';

const AddVoyage = ({ match }) => {
  const voyage_id = parseInt(match.params.voyage_id) || false; 

  const [error, setError] = useState();
  const { register, handleSubmit, errors } = useForm();

  const meta = {
    pageTitle: `Add a voyage`,
    pageDescription: '“Once a year, go someplace you’ve never been before.”',
    bodyClass: 'pageAddTrip'
  }

  const breadcrumb = {
    0: {
      label: 'voyages',
      link: '/admin/voyages'
    }
  }

  const onSubmit = (formData) => {
    const newFormData = new FormData();

    if(formData?.images){
      Object.keys(formData?.images).map(function (key, index) {
        let images = formData?.images;
        newFormData.append('image_' + index, images[key]);
      });
    }

    formData = { ...newFormData, ...formData }

    submitVoyage(formData).then((res) => {
      console.log(res);
    });
  }

  return (
    <PageWrapper meta={meta} breadcrumb={breadcrumb}>

      <div className={styles.containerTitles}>
        <h1 className={styles.h1}>Formulaire</h1>
        <h3 className={styles.h3}>Aliquam posuere eros, donec pretium dignissim volutpat</h3>
      </div>
      
      <div>
        <form className={styles.formAddTrip} onSubmit={handleSubmit(onSubmit)} method="post" encType="multipart/form-data">
          <div className={styles.formTitle}>
            <label>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Name</span>
            </label>
            <input name="title" defaultValue="voyage" className={errors.title && styles.title} ref={register({ required: true })} />
            {errors.title && <span className={styles.errorField}>This field is required</span>}
          </div>

          <div className={styles.formTitle}>
            <label>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Images</span>
            </label>
            <input name="images" type="file" multiple className={errors.voyageTitle && styles.voyageTitle} ref={register({ required: true })} />
            {errors.images && <span className={styles.errorField}>This field is required</span>}
          </div>

          <button type="submit" className={styles.cta}>Ajouter</button>
        </form>
      </div>

    </PageWrapper>
  );
}

export default AddVoyage;
