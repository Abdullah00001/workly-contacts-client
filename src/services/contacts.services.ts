import ContactApi from '../apis/contacts.apis';
import {
  ICreateContactPayload,
  IFavoritePayload,
} from '../interfaces/contacts.interface';

const { createContact, getSingleContact, changeFavoriteStatus } = ContactApi;

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
};

export default ContactServices;
