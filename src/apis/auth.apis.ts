import axiosClient from '../configs/axios.configs';
import { ILoginPayload } from '../interfaces/login.interfaces';
import { IVerifyPayload } from '../interfaces/otpVerification.interfaces';
import { IFindUser } from '../interfaces/recover.interfaces';
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
  login: (payload: ILoginPayload) => {
    return axiosClient.post('/auth/login', payload);
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
  findUser: (payload: IFindUser) => {
    return axiosClient.post('/auth/recover/find', payload);
  },
  sentOtp: () => {
    return axiosClient.post('/auth/recover/sent-otp');
  },
};

export default AuthApis;
