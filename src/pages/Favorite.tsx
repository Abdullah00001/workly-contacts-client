import { FC, useEffect, useState } from "react";
import ContactTable from "../components/layout/ContactTable";
import axios from "axios";
import { IContactInfo } from "../interfaces/contacts.interface";

const Favorite: FC = () => {
  const [contactData, setContactData] = useState<IContactInfo[] | null>(null);
  useEffect(() => {
    (async () => {
      try {
        const data = await axios.get("../../db.json");
        setContactData(data.data);
      } catch (error) {
        setContactData(null);
        console.log(error);
      }
    })();
  }, []);
  return (
    <div className="max-w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-medium">Favorite {contactData?.length}</h1>
      </div>
      <ContactTable contactData={contactData} />
    </div>
  );
};

export default Favorite;
