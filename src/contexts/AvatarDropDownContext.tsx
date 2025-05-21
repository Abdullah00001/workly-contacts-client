import { createContext} from "react";
import { IAvatarDropDown } from "../interfaces/signup.interfaces";

const AvatarDropDownContext = createContext<IAvatarDropDown | undefined>(
  undefined
);

export default AvatarDropDownContext;
