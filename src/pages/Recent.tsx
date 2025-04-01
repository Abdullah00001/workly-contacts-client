import {FC, useEffect, useState} from 'react'
import ContactTable from '../components/layout/ContactTable';
import axios from 'axios';
import { IContactInfo } from '../interfaces/contacts.interface';

const Recent:FC = () => {
  const [contactData, setContactData] = useState<IContactInfo[] | []>([]);
  useEffect(() => {
    (async () => {
      try {
        const data = await axios.get("https://mocki.io/v1/1568fce4-83ba-42f7-980d-ac453ea0fee3");
        setContactData(data?.data);
      } catch (error) {
        setContactData([]);
        console.log(error);
      }
    })();
  }, []);
  return (
    <div className="max-w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-medium">Recent {contactData?.length}</h1>
      </div>
      <ContactTable contactData={contactData} />
    </div>
  );
}

export default Recent