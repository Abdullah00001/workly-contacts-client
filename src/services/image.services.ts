import ImageApis from '../apis/image.apis';

const { imageUpload, imageDelete } = ImageApis;

const ImageServices = {
  processImageUpload: async (payload: FormData) => {
    try {
      const response = await imageUpload(payload);
      return response.data;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error('Unknown Error Occurred In Process Image Upload');
    }
  },
  processImageDelete: async (payload: string) => {
    try {
      const response = await imageDelete(payload);
      return response.data;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error('Unknown Error Occurred In Process Image Delete');
    }
  },
};

export default ImageServices;
