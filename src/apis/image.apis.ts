import axiosClient from '../configs/axios.configs';

const ImageApis = {
  imageUpload: (payload: FormData) => {
    return axiosClient.post(`$/image`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  imageDelete: (payload: string) => {
    return axiosClient.delete(`$/image/${payload}`);
  },
};

export default ImageApis;
