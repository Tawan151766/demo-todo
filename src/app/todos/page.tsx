"use client";

import React, { useContext } from "react";
import { Card, message } from "antd";
import { AuthContext } from "@/core/context/AuthContext";
import useTodos from "@/core/hooks/useTodos";
import { Todo, updateTodoStatus } from "@/core/api/api";
import ProtectedRoute from "@/components/Auth/ProtectedRoute";
import TodoStats from "@/components/Todo/TodoStats";
import TodoTable from "@/components/Todo/TodoTable";

export default function TodosPage() {
  const { user, token: contextToken } = useContext(AuthContext);
  const { todos, summary, loading, setTodos } = useTodos();

  const total = summary?.total ?? todos.length;
  const completed =
    summary?.completed ?? todos.filter((t) => t.completed).length;
  const pending = summary?.pending ?? total - completed;

  const handleToggle = async (todo: Todo) => {
    try {
      const accessToken = contextToken || localStorage.getItem("token");
      if (!accessToken) return;

      const updated = await updateTodoStatus(
        accessToken,
        todo.id,
        !todo.completed
      );
      setTodos((prev) =>
        prev.map((t) =>
          t.id === todo.id ? { ...t, completed: updated.completed } : t
        )
      );
      message.success("Updated status");
    } catch (error) {
      console.error(error);
      message.error("Failed to update status");
    }
  };

  return (
    <ProtectedRoute allowedRoles={["admin", "employee"]}>
      <main className="p-8 max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">My Todos</h1>

        {user && (
          <Card className="bg-gray-50 border-none shadow-md rounded-lg mb-6">
            <div className="flex items-center space-x-4 p-6">
              <div className="flex-shrink-0 bg-blue-500 text-white rounded-full w-14 h-14 flex items-center justify-center text-2xl font-semibold uppercase">
                {user.name?.[0]}
              </div>
              <div>
                <div className="text-lg font-semibold">
                  {user.name} {user.lastName}
                </div>
                <div className="text-gray-500">@{user.username}</div>
                <div className="mt-1 inline-block px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-xs font-medium">
                  {user.role}
                </div>
              </div>
            </div>
          </Card>
        )}

        <div className="mt-4">
          <TodoStats
            total={total}
            completed={completed}
            pending={pending}
            loading={loading}
          />
        </div>

        <Card title="Todo List">
          <TodoTable todos={todos} loading={loading} onToggle={handleToggle} />
        </Card>
      </main>
    </ProtectedRoute>
  );
}
