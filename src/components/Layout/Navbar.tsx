"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layout, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { AuthContext } from "@/core/context/AuthContext";
import DrawerMenu from "./DrawerMenu";

const { Header } = Layout;

export default function Navbar() {
  const { user } = useContext(AuthContext);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (!user) return null;

  return (
    <Header
      className="flex justify-between items-center px-4"
      style={{ background: "#001529" }}
    >
      <Link
        href="/"
        className="text-lg font-bold text-white hover:text-yellow-400"
      >
        Todo App
      </Link>

      <Button
        type="text"
        icon={<MenuOutlined style={{ color: "#fff", fontSize: 20 }} />}
        onClick={() => setOpen(true)}
      />

      <DrawerMenu open={open} onClose={() => setOpen(false)} pathname={pathname} />
    </Header>
  );
}
