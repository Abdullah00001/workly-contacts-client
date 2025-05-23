import axiosClient from '../configs/axios.configs';
import { IVerifyPayload } from '../interfaces/otpVerification.interfaces';
import { ISignupPayload } from '../interfaces/signup.interfaces';

const AuthApis = {
  signup: (payload: ISignupPayload) => {
    return axiosClient.post('/auth/signup', payload);
  },
  verify: (payload: IVerifyPayload) => {
    return axiosClient.post('/auth/verify', payload);
  },
  resend: (payload: IVerifyPayload) => {
    return axiosClient.post('/auth/resend', payload);
  },
  check: () => {
    return axiosClient.post('/auth/check');
  },
  refresh: () => {
    return axiosClient.post('/auth/refresh');
  },
  logout: () => {
    return axiosClient.post('/auth/logout');
  },
};

export default AuthApis;
