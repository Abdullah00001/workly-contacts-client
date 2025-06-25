import axiosClient from '../configs/axios.configs';
import env from '../configs/env.configs';
import { ICreateContactPayload } from '../interfaces/contacts.interface';

const { BASE_URL } = env;

const ContactApi = {
  createContact: (payload: ICreateContactPayload) => {
    return axiosClient.post(`${BASE_URL}/contacts`, payload);
  },
  getSingleContact: (payload: string) => {
    return axiosClient.get(`${BASE_URL}/contacts/${payload}`);
  },
};

export default ContactApi;
