import { FC, useEffect, useState } from "react";
import ContactTable from "../components/layout/ContactTable";
import { IContactInfo } from "../interfaces/contacts.interface";
import axios from "axios";

const Trash: FC = () => {
  const [contactData, setContactData] = useState<IContactInfo[] | []>([]);
  useEffect(() => {
    (async () => {
      try {
        const data = await axios.get(
          "https://mocki.io/v1/1568fce4-83ba-42f7-980d-ac453ea0fee3"
        );
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
        <h1 className="text-2xl font-medium">Trash {contactData?.length}</h1>
      </div>
      <ContactTable contactData={contactData} />
    </div>
  );
};

export default Trash;
