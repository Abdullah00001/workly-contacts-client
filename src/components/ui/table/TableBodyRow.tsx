import {
  ChangeEvent,
  Dispatch,
  FC,
  MouseEvent,
  useEffect,
  useState,
} from 'react';
import { FaEdit, FaStar, FaRegStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import ContactServices from '../../../services/contacts.services';
import {
  IFavoritePayload,
  TImage,
} from '../../../interfaces/contacts.interface';

interface ITableBodyRowProps {
  name: string;
  email: string;
  phone: string;
  isFavorite: boolean;
  avatar: TImage;
  id: string;
  selectedContacts: string[];
  setSelectedContacts: Dispatch<React.SetStateAction<string[]>>;
}
const { processChangeFavoriteStatus } = ContactServices;

const TableBodyRow: FC<ITableBodyRowProps> = ({
  email,
  phone,
  name,
  id,
  avatar,
  isFavorite: isFavoriteProp,
  selectedContacts,
  setSelectedContacts,
}) => {
  const queryClient = useQueryClient();
  const isSelected = selectedContacts.includes(id);

  const [isFavorite, setIsFavorite] = useState<boolean>(isFavoriteProp);
  const [isHover, setIsHover] = useState(false);
  const { mutate: changeFavoriteStatus, isPending } = useMutation({
    mutationFn: async ({ id, payload }: IFavoritePayload) =>
      await processChangeFavoriteStatus({ id, payload }),
    onSuccess: (data) => {
      toast.dismiss();
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      queryClient.invalidateQueries({ queryKey: ['contact', id] });
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      if (data.data.isFavorite === false) {
        setIsFavorite(data.data.isFavorite);
        toast.success(`Removed ${data?.data?.name} to favorites`);
      }
      if (data.data.isFavorite === true) {
        setIsFavorite(data.data.isFavorite);
        toast.success(`Added ${data?.data?.name} to favorites`);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const handleSelect = (e: ChangeEvent<HTMLInputElement> | MouseEvent) => {
    e.stopPropagation();
    setSelectedContacts((prev) =>
      isSelected ? prev.filter((contactId) => contactId !== id) : [...prev, id]
    );
  };
  const handleFavorite = (e: MouseEvent) => {
    e.stopPropagation();
    changeFavoriteStatus({ id, payload: { isFavorite: !isFavorite } });
  };
  const handleEditClick = (e: MouseEvent) => {
    e.stopPropagation();
    navigate(`/person/edit/${id}`, { state: { from: location.pathname } });
  };
  const navigate = useNavigate();
  const handleDetails = (e: MouseEvent<HTMLTableRowElement>) => {
    const target = e.target as HTMLElement;
    if (
      target.tagName === 'INPUT' ||
      target.tagName === 'BUTTON' ||
      target.closest('svg') ||
      target.closest('label')
    ) {
      return;
    }
    navigate(`/person/${id}`, { state: { from: location.pathname } });
  };
  useEffect(() => {
    if (!isPending) return;
    toast.dismiss();
    toast.info('Working...');
  }, [isPending]);
  return (
    <tr
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={handleDetails}
      className={`${isSelected && 'bg-blue-300'} ${
        isSelected ? 'hover:bg-blue-300' : 'hover:bg-gray-300'
      }  cursor-pointer transition-all duration-300 ease-in-out`}
    >
      {/* For Laptop And Desktop Devices */}
      <td className="pl-3  py-2 hidden lg:block">
        <div className="flex items-center space-x-2">
          <div
            className="w-[40px] h-[40px] rounded-full cursor-pointer flex justify-center items-center  duration-300 ease-in-out"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            {isSelected ? (
              <input
                checked={isSelected}
                onChange={handleSelect}
                type="checkbox"
                className="cursor-pointer w-5 h-5"
              />
            ) : isHover ? (
              <input
                checked={isSelected}
                onChange={handleSelect}
                type="checkbox"
                className="cursor-pointer w-5 h-5"
              />
            ) : (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(e);
                }}
              >
                {avatar.url ? (
                  <img
                    src={avatar.url}
                    alt="Avatar"
                    className="w-10 h-10 cursor-pointer rounded-full"
                  />
                ) : (
                  <img
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${name}`}
                    alt="Avatar"
                    className="w-10 h-10 cursor-pointer rounded-full"
                  />
                )}
              </div>
            )}
          </div>
          <div>{name}</div>
        </div>
      </td>
      <td className="pl-3  py-2 lg:hidden">
        <div className="flex items-center space-x-2">
          <div
            onClick={handleSelect}
            className={`w-[40px] h-[40px] rounded-full cursor-pointer flex justify-center items-center  duration-300 ease-in-out`}
          >
            {isSelected ? (
              <input
                checked={isSelected}
                onChange={handleSelect}
                name="selectCheckbox"
                type="checkbox"
                className="cursor-pointer w-5 h-5"
              />
            ) : (
              <>
                {avatar.url ? (
                  <img
                    src={avatar.url}
                    alt="Avatar"
                    className="w-10 h-10 cursor-pointer rounded-full"
                  />
                ) : (
                  <img
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${name}`}
                    alt="Avatar"
                    className="w-10 h-10 cursor-pointer rounded-full"
                  />
                )}
              </>
            )}
          </div>
          <div>{name}</div>
        </div>
      </td>
      <td className="hidden py-2  md:table-cell hover:underline hover:text-blue-500">
        {email}
      </td>
      <td className="hidden pr-4 py-2  lg:table-cell transition-all duration-300 ease-in-out">
        <div className="flex justify-between items-center">
          <span className="lg:hidden xl:block">{phone}</span>
          <div></div>
          {isHover && (
            <div className="flex items-center space-x-2">
              <span
                className="ml-2 text-gray-600 cursor-pointer"
                onClick={handleEditClick}
              >
                <FaEdit size={20} />
              </span>
              {isFavorite ? (
                <span
                  className="ml-2 text-blue-600 cursor-pointer"
                  onClick={handleFavorite}
                >
                  <FaStar size={20} />
                </span>
              ) : (
                <span
                  onClick={handleFavorite}
                  className="ml-2 text-gray-600 cursor-pointer"
                >
                  <FaRegStar size={20} />
                </span>
              )}
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

export default TableBodyRow;
