"use client";
import { createContext, useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { getUsers } from "../api/api";

export interface User {
  id: number;
  name: string;
  lastName: string;
  username: string;
  role: string;
}

interface UserContextType {
  users: User[];
  loading: boolean;
  refreshUsers: () => void;
}

export const UserContext = createContext<UserContextType>({
  users: [],
  loading: false,
  refreshUsers: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { token } = useContext(AuthContext);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    console.log("test :>>xxx ");

    const accessToken = token || localStorage.getItem("token");
    if (!accessToken) return;

    setLoading(true);
    try {
      const users = await getUsers(accessToken);
      console.log("users :>> ", users);
      setUsers(users);
    } catch (e) {
      console.error("Failed to fetch users", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider value={{ users, loading, refreshUsers: fetchUsers }}>
      {children}
    </UserContext.Provider>
  );
};
