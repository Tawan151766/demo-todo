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
    <Drawer placement="right" open={open} onClose={onClose} title="Menu">
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        items={menuItems}
        onClick={onClose}
      />

      <Divider style={{ margin: 0 }} />
      <UserInfo onClose={onClose} />
    </Drawer>
  );
}
