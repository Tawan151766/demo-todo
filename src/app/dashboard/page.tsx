"use client";
import { useContext, useEffect, useState } from "react";
import { message } from "antd";
import { AuthContext } from "@/core/context/AuthContext";
import { getAdminSummaryAll, AdminSummaryAllItem } from "@/core/api/api";
import ProtectedRoute from "../../components/Auth/ProtectedRoute";
import DashboardUserTable from "../../components/Dashboard/DashboardUserTable";
import TodoStats from "../../components/Todo/TodoStats";

interface Summary {
  total: number;
  completed: number;
  pending: number;
  perUser: AdminSummaryAllItem[];
}

export default function DashboardPage() {
  const { token } = useContext(AuthContext);
  const [data, setData] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) return;
    setLoading(true);

    getAdminSummaryAll(token)
      .then((perUser) => {
        const total = perUser.reduce((acc, cur) => acc + cur.total, 0);
        const completed = perUser.reduce((acc, cur) => acc + cur.completed, 0);
        const pending = total - completed;

        setData({ total, completed, pending, perUser });
      })
      .catch(() => {
        message.error("Failed to load admin summary");
      })
      .finally(() => setLoading(false));
  }, [token]);

  if (!data) return <div className="p-8">Loading...</div>;

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <main className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        <TodoStats
          total={data.total}
          completed={data.completed}
          pending={data.pending}
          loading={loading}
        />

        <DashboardUserTable data={data.perUser} loading={loading} />
      </main>
    </ProtectedRoute>
  );
}
