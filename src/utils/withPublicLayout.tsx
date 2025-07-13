import { ReactElement } from 'react';
import PublicLayout from '../layouts/PublicLayout';

const withPublicLayout = (element: ReactElement) => {
  return <PublicLayout>{element}</PublicLayout>;
};

export default withPublicLayout;
