import axiosClient from '../configs/axios.configs';
import env from '../configs/env.configs';
import {
  IBulkTrashPayload,
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
  getAllContacts: () => {
    return axiosClient.get(`${BASE_URL}/contacts`);
  },
  singleTrash: ({ id }: { id: string }) => {
    return axiosClient.patch(`${BASE_URL}/trash/${id}`);
  },
  bulkTrash: (payload: IBulkTrashPayload) => {
    return axiosClient.patch(`${BASE_URL}/trash`, payload);
  },
  getAllFavorites: () => {
    return axiosClient.get(`${BASE_URL}/favorites`);
  },
  getAllTrashes: () => {
    return axiosClient.get(`${BASE_URL}/trash`);
  },
  bulkDelete: (payload: IBulkTrashPayload) => {
    return axiosClient.delete(`${BASE_URL}/contacts/delete`, { data: payload });
  },
  singleDelete: ({ id }: { id: string }) => {
    return axiosClient.delete(`${BASE_URL}/contacts/delete/${id}`);
  },
  singleContactRecover: ({ id }: { id: string }) => {
    return axiosClient.patch(`${BASE_URL}/contacts/recover/${id}`);
  },
  bulkContactRecover: (payload: IBulkTrashPayload) => {
    return axiosClient.patch(`${BASE_URL}/contacts/recover`, payload);
  },
  emptyTrash: () => {
    return axiosClient.delete(`${BASE_URL}/contacts/empty`);
  },
};

export default ContactApi;
