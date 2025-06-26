import ContactApi from '../apis/contacts.apis';
import { ICreateContactPayload } from '../interfaces/contacts.interface';

const { createContact, getSingleContact } = ContactApi;

const ContactServices = {
  processCreateContact: async (payload: ICreateContactPayload) => {
    console.log(payload);
    try {
      const response = await createContact(payload);
      console.log(response);
      return response.data;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error('Unknown Error Occurred In Create Contact Service');
    }
  },
  processGetSingleContact: async (payload: string) => {
    console.log(payload);
    try {
      const response = await getSingleContact(payload);
      console.log(response);
      return response.data;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error('Unknown Error Occurred In Create Contact Service');
    }
  },
};

export default ContactServices;
