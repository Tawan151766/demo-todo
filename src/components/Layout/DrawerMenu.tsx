"use client";

import Link from "next/link";
import { Drawer, Menu, Divider } from "antd";
import {
  HomeOutlined,
  DashboardOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import UserInfo from "./UserInfo";

interface DrawerMenuProps {
  open: boolean;
  onClose: () => void;
  pathname: string;
}

const menuItems = [
  { key: "/", label: <Link href="/">Home</Link>, icon: <HomeOutlined /> },
  {
    key: "/dashboard",
    label: <Link href="/dashboard">Dashboard</Link>,
    icon: <DashboardOutlined />,
  },
  {
    key: "/todos",
    label: <Link href="/todos">Todos</Link>,
    icon: <UnorderedListOutlined />,
  },
];

export default function DrawerMenu({
  open,
  onClose,
  pathname,
}: DrawerMenuProps) {
  const selectedKey =
    menuItems
      .map((item) => item.key)
      .filter((key) => pathname === key || pathname.startsWith(`${key}/`))
      .sort((a, b) => b.length - a.length)[0] ?? "/";

  return (
    <Drawer 
      placement="right" 
      open={open} 
      onClose={onClose} 
      title={
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
            <span className="text-blue-600 font-bold text-xs">T</span>
          </div>
          <span className="text-lg font-semibold text-gray-800">Navigation</span>
        </div>
      }
      width={320}
      styles={{
        header: {
          borderBottom: '1px solid #f0f0f0',
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        },
        body: {
          padding: 0,
          background: '#ffffff',
        }
      }}
    >
      <div className="p-4">
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          onClick={onClose}
          className="border-none"
          style={{
            background: 'transparent',
          }}
        />
      </div>

      <div className="border-t border-gray-100 mt-auto">
        <UserInfo onClose={onClose} />
      </div>
    </Drawer>
  );
}
