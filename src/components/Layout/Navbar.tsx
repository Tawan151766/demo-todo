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
      className="flex justify-between items-center px-6 shadow-lg border-b border-blue-200"
      style={{ 
        background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
        height: "70px"
      }}
    >
      <Link
        href="/"
        className="text-xl font-bold text-white hover:text-blue-100 transition-colors duration-200 flex items-center gap-2"
      >
        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">T</span>
        </div>
        <span className="text-lg font-bold text-white">Todo Management</span>
      </Link>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 text-white/90 text-sm">
          <span>Welcome,</span>
          <span className="font-semibold text-white">{user.name} {user.lastName}</span>
        </div>
        
        <Button
          type="text"
          icon={<MenuOutlined className="text-white text-xl" />}
          onClick={() => setOpen(true)}
          className="hover:bg-white/10 border-none h-10 w-10 rounded-lg transition-colors duration-200"
        />
      </div>

      <DrawerMenu open={open} onClose={() => setOpen(false)} pathname={pathname} />
    </Header>
  );
}
