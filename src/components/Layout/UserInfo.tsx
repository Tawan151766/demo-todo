"use client";

import { useContext } from "react";
import { Button, Avatar } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { AuthContext } from "@/core/context/AuthContext";

interface UserInfoProps {
  onClose: () => void;
}

export default function UserInfo({ onClose }: UserInfoProps) {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="p-4 flex justify-between items-center gap-2">
      <div className="flex items-center gap-2">
        <Avatar icon={<UserOutlined />} />
        <div>
          <div className="font-semibold">
            {user?.name} {user?.lastName}
          </div>
          <div className="text-sm text-gray-500">{user?.role}</div>
        </div>
      </div>

      <Button
        danger
        icon={<LogoutOutlined />}
        onClick={() => {
          onClose();
          logout();
        }}
      >
        Logout
      </Button>
    </div>
  );
}
