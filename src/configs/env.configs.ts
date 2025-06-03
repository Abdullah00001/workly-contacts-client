import getEnv from '../utils/env.utils';

const env = {
  BASE_URL: getEnv('VITE_API_BASE_URL'),
  OTP_LENGTH: Number(getEnv('VITE_OTP_LENGTH')),
  VU_E_SECRET: getEnv('VITE_VU_E_SECRET'),
};

export default env;
