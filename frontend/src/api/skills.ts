import { TNewSkills, TSkills } from '../types';
import axios, { AxiosError } from 'axios';
import { API_URL } from './common';
import { toaster } from '../components/ui/toaster';

export const getSkills = async () => {
  return axios
    .get(`${API_URL}skills`)
    .then((response) => response.data as unknown as { skills: TSkills[] })
    .catch((err: unknown) => {
      console.error(err);
      return;
    });
};

export const deleteSkill = async (skillId: number) => {
  return axios
    .delete(`${API_URL}skills/${skillId}`)
    .then((response) => {
      toaster.create({
        title: 'Deleted Skills',
        type: 'success',
      });
      return response.data;
    })
    .catch((err: unknown) => {
      console.error(err);
      return;
    });
};

export const postSkill = async (data: TNewSkills) => {
  return axios
    .post(`${API_URL}skills`, data, {
      headers: { 'Content-Type': 'application/json' },
    })
    .then((response) => {
      toaster.create({
        title: 'Added Skills',
        type: 'success',
      });
      return response.data;
    })
    .catch((err: AxiosError) => {
      toaster.create({
        title: err.message,
        type: 'error',
      });
      return;
    });
};
