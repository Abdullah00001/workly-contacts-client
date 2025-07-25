import { useEffect } from 'react';
import { IMetaDataProps } from '../interfaces/meta.interface';

const PageTitle = ({ title, description }: IMetaDataProps) => {
  useEffect(() => {
    document.title = title;

    if (description) {
      let metaDescription = document.querySelector(
        "meta[name='description']"
      ) as HTMLMetaElement | null;
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      } else {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        metaDescription.content = description;
        document.head.appendChild(metaDescription);
      }
    }
  }, [title, description]);

  return null;
};

export default PageTitle;
