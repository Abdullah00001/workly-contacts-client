import ContactApi from '../apis/contacts.apis';
import {
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
};

export default ContactServices;
