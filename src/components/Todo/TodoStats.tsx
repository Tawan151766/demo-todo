"use client";

import { Card, Statistic } from "antd";
import {
  UnorderedListOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

interface TodoStatsProps {
  total: number;
  completed: number;
  pending: number;
  loading: boolean;
}

export default function TodoStats({
  total,
  completed,
  pending,
  loading,
}: TodoStatsProps) {
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {/* Total Todos Card */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 font-medium mb-1">Total Todos</p>
            <p className="text-3xl font-bold text-gray-900">
              {loading ? (
                <p className="h-8 w-16 bg-gray-200 rounded animate-pulse"></p>
              ) : (
                total
              )}
            </p>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <UnorderedListOutlined className="text-blue-600 text-xl" />
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-gray-100">
          <p className="text-sm text-gray-500">All tasks in system</p>
        </div>
      </div>

      {/* Completed Card */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 font-medium mb-1">Completed</p>
            <p className="text-3xl font-bold text-green-600">
              {loading ? (
                <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
              ) : (
                completed
              )}
            </p>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <CheckCircleOutlined className="text-green-600 text-xl" />
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            {completionRate}% completion rate
          </p>
        </div>
      </div>

      {/* Pending Card */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 font-medium mb-1">Pending</p>
            <p className="text-3xl font-bold text-orange-600">
              {loading ? (
                <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
              ) : (
                pending
              )}
            </p>
          </div>
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
            <ClockCircleOutlined className="text-orange-600 text-xl" />
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-gray-100">
          <p className="text-sm text-gray-500">Tasks remaining</p>
        </div>
      </div>
    </div>
  );
}
