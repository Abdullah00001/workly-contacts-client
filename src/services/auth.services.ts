import AuthApis from "../apis/auth.apis";
import { ISignupPayload } from "../interfaces/signup.interfaces";

const { signup } = AuthApis;

const AuthServices = {
  processSignup: async (payload: ISignupPayload) => {
    try {
      const response = await signup(payload);
      return response.data.data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Unexpected Error Occurred In Process Signup");
      }
    }
  },
};

export default AuthServices;
