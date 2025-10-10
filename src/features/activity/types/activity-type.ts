export type TActivity = {
  _id: string;
  title: string;
  device: string;
  location: string;
  createdAt: string;
};

export type TActivityDetailsPageProps = {
  params: Promise<{ objectId: string }>;
};

export enum ActivityType {
  LOGIN_FAILED = 'LOGIN_FAILED',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  SIGNUP_SUCCESS = 'SIGNUP_SUCCESS',
  PASSWORD_RESET = 'PASSWORD_RESET',
  ACCOUNT_LOCKED = 'ACCOUNT_LOCKED',
  ACCOUNT_ACTIVE = 'ACCOUNT_ACTIVE',
}

export type TActivityDetails = {
  activityType: ActivityType;
  title: string;
  description: string;
  device: string;
  os: string;
  browser: string;
  location: string;
  ipAddress: string;
  user: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
  _v: number;
};

export type TActivityDetailsProps = {
  data: TActivityDetails;
};
