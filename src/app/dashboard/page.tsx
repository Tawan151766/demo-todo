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

  if (!data) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg">Loading dashboard...</p>
      </div>
    </div>
  );

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <main className="p-8 max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600 text-lg">Overview of all todos and user performance</p>
          </div>

          {/* Stats Section */}
          <div className="mb8">
            <TodoStats
              total={data.total}
              completed={data.completed}
              pending={data.pending}
              loading={loading}
            />
          </div>

          {/* User Performance Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">User Performance</h2>
              <p className="text-gray-600">Track individual user todo completion statistics</p>
            </div>
            <div className="p-6">
              <DashboardUserTable data={data.perUser} loading={loading} />
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
