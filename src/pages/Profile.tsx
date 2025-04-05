import { FC } from "react";
import { useLocation } from "react-router-dom";
import EditProfile from "./EditProfile";
import ViewProfile from "./ViewProfile";

const Profile: FC = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const isEditMode = query.get("edit") === "1";
  return <>{isEditMode ? <EditProfile /> : <ViewProfile />}</>;
};

export default Profile;
