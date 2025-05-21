import axiosClient from "../configs/axios.configs";
import { ISignupPayload } from "../interfaces/signup.interfaces";

const AuthApis = {
  signup: (payload: ISignupPayload) => {
    return axiosClient.post("/auth/signup", payload);
  },
};

export default AuthApis;
