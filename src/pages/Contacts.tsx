import { FC, useEffect, useState } from "react";
import ContactTable from "../components/layout/ContactTable";
import { IContactInfo } from "../interfaces/contacts.interface";
import axios from "axios";

const Contacts: FC = () => {
  const [contactData, setContactData] = useState<IContactInfo[] | []>([]);
  useEffect(() => {
    (async () => {
      try {
        const data = await axios.get("https://mocki.io/v1/5b7d1064-5c3e-44f8-a59c-6789ae383e58");
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
        <h1 className="text-2xl font-medium">Contacts {contactData?.length}</h1>
      </div>
      <ContactTable contactData={contactData} />
    </div>
  );
};

export default Contacts;
