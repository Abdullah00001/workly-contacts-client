import getEnv from '../utils/env.utils';

const env = {
  BASE_URL: getEnv('VITE_API_BASE_URL'),
  OTP_LENGTH: Number(getEnv('VITE_OTP_LENGTH')),
};

export default env;
