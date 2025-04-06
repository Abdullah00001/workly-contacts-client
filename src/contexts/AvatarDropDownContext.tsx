import { createContext, Dispatch, useContext } from "react";

export interface IAvatarDropDown {
  isLogOutClicked: boolean;
  setIsLogoutClicked: Dispatch<React.SetStateAction<boolean>>;
  isFeedBackClicked: boolean;
  setIsFeedBackClicked: Dispatch<React.SetStateAction<boolean>>;
}

const AvatarDropDownContext = createContext<IAvatarDropDown | undefined>(
  undefined
);

export const useAvatarDropDownContext = (): IAvatarDropDown => {
  const context = useContext(AvatarDropDownContext);
  if (!context) {
    throw new Error(
      "useAvatarDropDownContext must be used within an AvatarProvider"
    );
  }
  return context;
};

export default AvatarDropDownContext;
