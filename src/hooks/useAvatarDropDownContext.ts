import { useContext } from 'react';
import { IAvatarDropDown } from '../interfaces/signup.interfaces';
import AvatarDropDownContext from '../contexts/AvatarDropDownContext';

const useAvatarDropDown = (): IAvatarDropDown => {
  const context = useContext(AvatarDropDownContext);
  if (!context) {
    throw new Error(
      'useAvatarDropDownContext must be used within an AvatarProvider'
    );
  }
  return context;
};

export default useAvatarDropDown;
