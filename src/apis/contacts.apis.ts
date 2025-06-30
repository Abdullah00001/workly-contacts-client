import axiosClient from '../configs/axios.configs';
import env from '../configs/env.configs';
import {
  ICreateContactPayload,
  IEditContact,
  IFavoritePayload,
} from '../interfaces/contacts.interface';

const { BASE_URL } = env;

const ContactApi = {
  createContact: (payload: ICreateContactPayload) => {
    return axiosClient.post(`${BASE_URL}/contacts`, payload);
  },
  getSingleContact: (payload: string) => {
    return axiosClient.get(`${BASE_URL}/contacts/${payload}`);
  },
  changeFavoriteStatus: ({ id, payload }: IFavoritePayload) => {
    return axiosClient.patch(`${BASE_URL}/favorites/${id}`, payload);
  },
  putEditContact: ({ id, payload }: IEditContact) => {
    return axiosClient.put(`${BASE_URL}/contacts/${id}`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  patchEditContact: ({ id, payload }: IEditContact) => {
    return axiosClient.patch(`${BASE_URL}/contacts/${id}`, payload);
  },
};

export default ContactApi;
