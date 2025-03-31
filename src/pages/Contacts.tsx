import { FC, useEffect, useState } from "react";
import ContactTable from "../components/layout/ContactTable";
import { IContactInfo } from "../interfaces/contacts.interface";
import axios from "axios";

const Contacts: FC = () => {
  const [contactData, setContactData] = useState<IContactInfo[] | []>([]);
  useEffect(() => {
    (async () => {
      try {
        const data = await axios.get("https://mocki.io/v1/a7e1f0d3-bfe7-4684-aede-1f102a4cfbe1");
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
