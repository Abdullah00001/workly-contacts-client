export type TGetProfileData = {
  name: string | null;
  email: string | null;
  avatar: {
    url: string | null;
    publicId: string | null;
  };
  phone: string | null;
};
