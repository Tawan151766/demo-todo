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
  const completed = summary?.completed ?? todos.filter((t) => t.completed).length;
  const pending = summary?.pending ?? total - completed;

  const handleToggle = async (todo: Todo) => {
    try {
      const accessToken = contextToken || localStorage.getItem("token");
      if (!accessToken) return;

      const updated = await updateTodoStatus(accessToken, todo.id, !todo.completed);
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
          <Card className="p-20">
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Role:</strong> {user.role}
            </p>
          </Card>
        )}

        <TodoStats total={total} completed={completed} pending={pending} loading={loading} />

        <Card title="Todo List">
          <TodoTable todos={todos} loading={loading} onToggle={handleToggle} />
        </Card>
      </main>
    </ProtectedRoute>
  );
}
