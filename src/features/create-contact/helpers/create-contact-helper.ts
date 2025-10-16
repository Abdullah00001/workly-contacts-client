import { Countries } from '@/consts/const';
import { TContact } from '../types/type';

export const getIsoFromPayloadValue = (value: string | null) => {
  if (!value) return 'bd'; // default
  const asIso = value.toLowerCase();
  // If it's already an ISO and exists in Countries, return it
  if (Countries.some((c) => c.iso.toLowerCase() === asIso)) return asIso;

  // Otherwise try treat value as dial code like "+880" and find matching country
  const found = Countries.find(
    (c) =>
      c.code === value ||
      c.code === (value.startsWith('+') ? value : `+${value}`)
  );
  if (found) return found.iso.toLowerCase();

  return 'bd';
};

const defaultPayload: TContact = {
  avatar: { publicId: null, url: null },
  birthday: { day: null, month: '', year: null },
  email: '',
  firstName: '',
  lastName: '',
  location: { city: null, country: null, postCode: null, streetAddress: null },
  phone: { countryCode: '', number: '' },
  worksAt: { companyName: null, jobTitle: null },
};

// Deep comparison function
export const isPayloadChanged = (payload: TContact) => {
  const isEqual = (a: any, b: any): boolean => {
    if (typeof a !== typeof b) return false;
    if (typeof a !== 'object' || a === null || b === null) return a === b;

    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;

    return keysA.every((key) => keysB.includes(key) && isEqual(a[key], b[key]));
  };

  return !isEqual(payload, defaultPayload);
};
