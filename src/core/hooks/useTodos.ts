"use client";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "@/core/context/AuthContext";
import { message } from "antd";
import { getTodos, getUserSummary, Todo, UserSummary } from "@/core/api/api";

interface UseTodosResult {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>; // ✅ เพิ่มตรงนี้
  summary: UserSummary | null;
  loading: boolean;
  reload: () => void;
}

const useTodos = (): UseTodosResult => {
  const { token } = useContext(AuthContext);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [summary, setSummary] = useState<UserSummary | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    if (!token) return;
    setLoading(true);

    getUserSummary(token)
      .then((summaryData) => {
        setTodos(summaryData.list);
        setSummary(summaryData);
      })
      .catch(() => {
        message.error("Failed to load todo data");
        setTodos([]);
        setSummary(null);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  return { todos, setTodos, summary, loading, reload: fetchData };
};

export default useTodos;
