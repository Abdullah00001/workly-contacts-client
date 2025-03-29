import { FC } from "react";

interface User {
  name: string;
  avatarUrl?: string;
}

const Avatar: FC = () => {
  const user: User = {
    name: "Jane Doe",
    avatarUrl:
      "https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyfGVufDB8fDB8fHww", // Using placeholder image
  };

  // Fallback avatar URL
  const fallbackAvatarUrl = "https://via.placeholder.com/150?text=No+Avatar";

  return (
    <div className="relative">
      <div>
        <img
          className="w-[40px] h-[40px] rounded-[50%] object-cover"
          src={user.avatarUrl || fallbackAvatarUrl} // Use fallback if avatarUrl is not provided
          alt={user.name}
        />
      </div>
    </div>
  );
};

export default Avatar;
