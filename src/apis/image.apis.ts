import axiosClient from '../configs/axios.configs';
import env from '../configs/env.configs';
const { BASE_URL } = env;

const ImageApis = {
  imageUpload: (payload: FormData) => {
    return axiosClient.post(`${BASE_URL}/image`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  imageDelete: (payload: string) => {
    return axiosClient.delete(`${BASE_URL}/image/${payload}`);
  },
};

export default ImageApis;
