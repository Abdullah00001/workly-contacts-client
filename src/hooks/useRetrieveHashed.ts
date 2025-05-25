import Cookies from 'js-cookie';
import AES from 'crypto-js/aes';
import encUtf8 from 'crypto-js/enc-utf8';
import env from '../configs/env.configs';
import { useEffect, useState } from 'react';

const { VU_E_SECRET } = env;

const useRetrieveHashed = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Add loading state

  useEffect(() => {
    const hashed = Cookies.get('v_ue');
    if (!hashed) {
      setEmail(null);
      setIsLoading(false);
      return;
    }
    try {
      const bytes = AES.decrypt(hashed, VU_E_SECRET);
      setEmail(bytes.toString(encUtf8));
    } catch (error) {
      console.error(error);
      setEmail(null);
    }
    setIsLoading(false);
  }, []);

  return { email, isLoading }; // Return both email and loading state
};

export default useRetrieveHashed;
