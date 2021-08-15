import { axiosInstance } from './index';

export const submitVoyage = async ( formData ) => {
  console.log(formData);
  let promise = await axiosInstance.post('/api/voyage/create', formData);

  if (typeof promise.data !== 'undefined') {
    return promise.data;
  }

  return {
    error: 'error'
  }
}