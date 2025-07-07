"use client";

import React, { useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AuthContext } from "@/core/context/AuthContext";

interface Props {
  children: React.ReactNode;
  allowedRoles?: string[]; // NEW: optional allowed roles
}

// Helper: decode JWT payload
const parseJwt = (token: string) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
};

export default function ProtectedRoute({ children, allowedRoles }: Props) {
  const { token: ctxToken, user, loading } = useContext(AuthContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;

    const storedToken = localStorage.getItem("token");
    const accessToken = ctxToken || storedToken;

    if (!accessToken) {
      router.replace("/login");
      return;
    }

    // Get role
    let role = user?.role;
    if (!role) {
      const payload = parseJwt(accessToken);
      role = payload?.role;
    }

    // Check role restriction
    if (allowedRoles && !allowedRoles.includes(role)) {
      router.replace("/todos"); // fallback route
      return;
    }

    setIsAuthenticated(true);
  }, [ctxToken, user, loading, pathname, router, allowedRoles]);

  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return null;

  return <>{children}</>;
}
