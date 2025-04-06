import { FC, ReactNode, useState } from "react";
import AvatarDropDownContext from "../contexts/AvatarDropDownContext";

interface IAvatarDropdownProviderProps {
  children: ReactNode;
}

const AvatarDropDownProvider: FC<IAvatarDropdownProviderProps> = ({
  children,
}) => {
  const [isLogOutClicked, setIsLogoutClicked] = useState(false);
  const [isFeedBackClicked, setIsFeedBackClicked] = useState(false);
  return (
    <AvatarDropDownContext.Provider
      value={{
        isFeedBackClicked,
        isLogOutClicked,
        setIsFeedBackClicked,
        setIsLogoutClicked,
      }}
    >
      {children}
    </AvatarDropDownContext.Provider>
  );
};

export default AvatarDropDownProvider;
