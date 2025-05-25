import AuthApis from '../apis/auth.apis';
import { ILoginPayload } from '../interfaces/login.interfaces';
import { IVerifyPayload } from '../interfaces/otpVerification.interfaces';
import { IFindUser } from '../interfaces/recover.interfaces';
import { ISignupPayload } from '../interfaces/signup.interfaces';

const {
  signup,
  verify,
  resend,
  check,
  refresh,
  logout,
  login,
  findUser,
  sentOtp,
} = AuthApis;

const AuthServices = {
  processSignup: async (payload: ISignupPayload) => {
    try {
      const response = await signup(payload);
      return response.data.data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error('Unexpected Error Occurred In Process Signup');
      }
    }
  },
  processVerify: async (payload: IVerifyPayload) => {
    try {
      const response = await verify(payload);
      return response.data.data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error('Unexpected Error Occurred In Process Verify');
      }
    }
  },
  processResend: async (payload: IVerifyPayload) => {
    try {
      const response = await resend(payload);
      return response.data.data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error('Unexpected Error Occurred In Process Resend');
      }
    }
  },
  processLogin: async (payload: ILoginPayload) => {
    try {
      const response = await login(payload);
      return response.data.data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error('Unexpected Error Occurred In Process Resend');
      }
    }
  },
  processCheck: async () => {
    try {
      const response = await check();
      return response.data.data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error('Unexpected Error Occurred In Process Check');
      }
    }
  },
  processRefresh: async () => {
    try {
      const response = await refresh();
      return response.data.data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error('Unexpected Error Occurred In Process Refresh');
      }
    }
  },
  processLogout: async () => {
    try {
      const response = await logout();
      return response.data.data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error('Unexpected Error Occurred In Process Logout');
      }
    }
  },
  processFindUser: async (payload: IFindUser) => {
    try {
      const response = await findUser(payload);
      return response.data.data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error('Unexpected Error Occurred In Process Find User');
      }
    }
  },
  processSentOtp: async () => {
    try {
      const response = await sentOtp();
      return response.data.data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error('Unexpected Error Occurred In Process Sent Otp');
      }
    }
  },
};

export default AuthServices;
