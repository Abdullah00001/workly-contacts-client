import ContactApi from '../apis/contacts.apis';
import {
  IBulkTrashPayload,
  ICreateContactPayload,
  IEditContact,
  IFavoritePayload,
} from '../interfaces/contacts.interface';

const {
  createContact,
  getSingleContact,
  changeFavoriteStatus,
  patchEditContact,
  putEditContact,
  getAllContacts,
  bulkTrash,
  getAllFavorites,
  getAllTrashes,
  bulkDelete,
  singleDelete,
  singleContactRecover,
  bulkContactRecover,
  emptyTrash,
  singleTrash,
  searchContact,
} = ContactApi;

const ContactServices = {
  processCreateContact: async (payload: ICreateContactPayload) => {
    try {
      const response = await createContact(payload);
      return response.data;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error('Unknown Error Occurred In Create Contact Service');
    }
  },
  processGetSingleContact: async (payload: string) => {
    try {
      const response = await getSingleContact(payload);
      return response.data;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error('Unknown Error Occurred In Create Contact Service');
    }
  },
  processChangeFavoriteStatus: async ({ id, payload }: IFavoritePayload) => {
    try {
      const response = await changeFavoriteStatus({ id, payload });
      return response.data;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error(
        'Unknown Error Occurred In Change Favorite Status Service'
      );
    }
  },
  processPutEditContact: async (payload: IEditContact) => {
    try {
      const response = await putEditContact(payload);
      return response.data;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error('Unknown Error Occurred In Put Edit Contact Service');
    }
  },
  processPatchEditContact: async (payload: IEditContact) => {
    try {
      const response = await patchEditContact(payload);
      return response.data;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error('Unknown Error Occurred In Patch Edit Contact Service');
    }
  },
  processGetAllContacts: async () => {
    try {
      const response = await getAllContacts();
      return response.data;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error('Unknown Error Occurred In Get All Contact Service');
    }
  },
  processBulkTrash: async (payload: IBulkTrashPayload) => {
    try {
      const response = await bulkTrash(payload);
      return response.data;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error('Unknown Error Occurred In Bulk Trash Service');
    }
  },
  processGetAllFavorites: async () => {
    try {
      const response = await getAllFavorites();
      return response.data;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error('Unknown Error Occurred In Get All Favorites Service');
    }
  },
  processGetAllTrashes: async () => {
    try {
      const response = await getAllTrashes();
      return response.data;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error('Unknown Error Occurred In Get All Trashes Service');
    }
  },
  processBulkDelete: async (payload: IBulkTrashPayload) => {
    try {
      const response = await bulkDelete(payload);
      return response.data;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error('Unknown Error Occurred In Bulk Delete Service');
    }
  },
  processSingleDelete: async (payload: { id: string }) => {
    try {
      const response = await singleDelete(payload);
      return response.data;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error('Unknown Error Occurred In single Delete Service');
    }
  },
  processSingleContactRecover: async (payload: { id: string }) => {
    try {
      const response = await singleContactRecover(payload);
      return response.data;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error('Unknown Error Occurred In Single Recover Service');
    }
  },
  processBulkContactRecover: async (payload: IBulkTrashPayload) => {
    try {
      const response = await bulkContactRecover(payload);
      return response.data;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error('Unknown Error Occurred In Bulk Recover Service');
    }
  },
  processEmptyTrash: async () => {
    try {
      const response = await emptyTrash();
      return response.data;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error('Unknown Error Occurred In Bulk Recover Service');
    }
  },
  processSingleTrash: async (payload: { id: string }) => {
    try {
      const response = await singleTrash(payload);
      return response.data;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error('Unknown Error Occurred In Single Trash Service');
    }
  },
  processSearchContact: async (payload: string) => {
    try {
      const response = await searchContact(payload);
      return response.data;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error('Unknown Error Occurred In Search Contact Service');
    }
  },
};

export default ContactServices;
