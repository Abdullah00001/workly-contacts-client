import { Countries } from '@/consts/const';

export const getIsoFromPayloadValue = (value: string|null) => {
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
