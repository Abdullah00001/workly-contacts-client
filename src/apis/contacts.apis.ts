import axiosClient from '../configs/axios.configs';
import {
  IBulkTrashPayload,
  ICreateContactPayload,
  IEditContact,
  IFavoritePayload,
} from '../interfaces/contacts.interface';

const ContactApi = {
  createContact: (payload: ICreateContactPayload) => {
    return axiosClient.post(`/contacts`, payload);
  },
  getSingleContact: (payload: string) => {
    return axiosClient.get(`/contacts/${payload}`);
  },
  changeFavoriteStatus: ({ id, payload }: IFavoritePayload) => {
    return axiosClient.patch(`/favorites/${id}`, payload);
  },
  putEditContact: ({ id, payload }: IEditContact) => {
    return axiosClient.put(`/contacts/${id}`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  patchEditContact: ({ id, payload }: IEditContact) => {
    return axiosClient.patch(`/contacts/${id}`, payload);
  },
  getAllContacts: () => {
    return axiosClient.get(`/contacts`);
  },
  singleTrash: ({ id }: { id: string }) => {
    return axiosClient.patch(`/trash/${id}`);
  },
  bulkTrash: (payload: IBulkTrashPayload) => {
    return axiosClient.patch(`/trash`, payload);
  },
  getAllFavorites: () => {
    return axiosClient.get(`/favorites`);
  },
  getAllTrashes: () => {
    return axiosClient.get(`/trash`);
  },
  bulkDelete: (payload: IBulkTrashPayload) => {
    return axiosClient.delete(`/contacts/delete`, { data: payload });
  },
  singleDelete: ({ id }: { id: string }) => {
    return axiosClient.delete(`/contacts/delete/${id}`);
  },
  singleContactRecover: ({ id }: { id: string }) => {
    return axiosClient.patch(`/contacts/recover/${id}`);
  },
  bulkContactRecover: (payload: IBulkTrashPayload) => {
    return axiosClient.patch(`/contacts/recover`, payload);
  },
  emptyTrash: () => {
    return axiosClient.delete(`/contacts/empty`);
  },
  searchContact: (payload: string) => {
    return axiosClient.get(`/search?query=${payload}`);
  },
};

export default ContactApi;
