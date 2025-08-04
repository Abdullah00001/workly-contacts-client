import AuthApis from '../apis/auth.apis';
import { ILoginPayload } from '../interfaces/login.interfaces';
import { IVerifyPayload } from '../interfaces/otpVerification.interfaces';
import {
  IFindUser,
  IResetPasswordPayload,
  IVerifyRecoverOtpPayload,
} from '../interfaces/recover.interfaces';
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
  reSentOtp,
  verifyOtp,
  resetPassWord,
  checkR_stp1,
  checkR_stp2,
  checkR_stp3,
  getProfile,
  getFullProfile,
  uploadProfileAvatar,
  removeProfileAvatar,
  changeProfileAvatar,
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
  processVerifyRecoverOtp: async (payload: IVerifyRecoverOtpPayload) => {
    try {
      const response = await verifyOtp(payload);
      return response.data.data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error('Unexpected Error Occurred In Process Sent Otp');
      }
    }
  },
  processReSentRecoverOtp: async () => {
    try {
      const response = await reSentOtp();
      return response.data.data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error('Unexpected Error Occurred In Process Sent Otp');
      }
    }
  },
  processResetPassword: async (payload: IResetPasswordPayload) => {
    try {
      const response = await resetPassWord(payload);
      return response.data.data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error('Unexpected Error Occurred In Process Reset Password');
      }
    }
  },
  processCheckR_stp1: async () => {
    try {
      const response = await checkR_stp1();
      return response.data.data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error('Unexpected Error Occurred In Process CheckR_stp1');
      }
    }
  },
  processCheckR_stp2: async () => {
    try {
      const response = await checkR_stp2();
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error('Unexpected Error Occurred In Process CheckR_stp2');
      }
    }
  },
  processCheckR_stp3: async () => {
    try {
      const response = await checkR_stp3();
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error('Unexpected Error Occurred In Process CheckR_stp3');
      }
    }
  },
  processGetProfile: async () => {
    try {
      const response = await getProfile();
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error('Unexpected Error Occurred In Process Get Profile');
      }
    }
  },
  processGetFullProfile: async () => {
    try {
      const response = await getFullProfile();
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error(
          'Unexpected Error Occurred In Process Get Full Profile'
        );
      }
    }
  },
  processUploadProfileAvatar: async (payload: FormData) => {
    try {
      const response = await uploadProfileAvatar(payload);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error(
          'Unexpected Error Occurred In Process Profile Avatar Upload'
        );
      }
    }
  },
  processChangeProfileAvatar: async (payload: FormData) => {
    try {
      const response = await changeProfileAvatar(payload);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error(
          'Unexpected Error Occurred In Process Change Profile Avatar'
        );
      }
    }
  },
  processRemoveProfileAvatar: async (payload: string) => {
    try {
      const response = await removeProfileAvatar(payload);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error(
          'Unexpected Error Occurred In Process Remove Profile Avatar'
        );
      }
    }
  },
};

export default AuthServices;
