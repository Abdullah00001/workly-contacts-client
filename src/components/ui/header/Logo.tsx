import { FC } from "react";
import { Link } from "react-router-dom";

const Logo: FC = () => {
  return (
    <Link to={"/"}>
      <h1 className="hidden md:block md:font-bold md:text-[22px]">
        Amar Contacts
      </h1>
    </Link>
  );
};

export default Logo;
