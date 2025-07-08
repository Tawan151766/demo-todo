import { Table, Progress } from "antd";
import { AdminSummaryAllItem } from "@/core/api/api";

interface DashboardUserTableProps {
  data: AdminSummaryAllItem[];
  loading: boolean;
}

export default function DashboardUserTable({ data, loading }: DashboardUserTableProps) {
  const columns = [
    { 
      title: "#",
      key: "index",
      render: (_: unknown, __: AdminSummaryAllItem, index: number) => (
        <span className="font-semibold text-gray-600">{index + 1}</span>
      ),
      width: 60,
    },
    { 
      title: "User", 
      dataIndex: "username", 
      key: "username",
      render: (text: string) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
            <span className="text-indigo-600 text-sm font-medium">
              {text?.[0]?.toUpperCase()}
            </span>
          </div>
          <span className="font-medium text-gray-900">{text}</span>
        </div>
      ),
    },
    { 
      title: "Total Todos", 
      dataIndex: "total", 
      key: "total",
      render: (value: number) => (
        <span className="font-semibold text-gray-900">{value}</span>
      ),
    },
    {
      title: "Completed",
      dataIndex: "completed",
      key: "completed",
      render: (value: number, record: AdminSummaryAllItem) => (
        <div className="flex items-center gap-2">
          <span className="font-semibold text-green-600">{value}</span>
          <span className="text-gray-400">/ {record.total}</span>
        </div>
      ),
    },
    {
      title: "Pending",
      key: "pending",
      render: (_: any, record: AdminSummaryAllItem) => {
        const pending = record.total - record.completed;
        return (
          <span className="font-semibold text-orange-600">{pending}</span>
        );
      },
    },
    {
      title: "Progress",
      key: "progress",
      render: (_: any, record: AdminSummaryAllItem) => {
        const percentage = record.total > 0 ? Math.round((record.completed / record.total) * 100) : 0;
        return (
          <div className="min-w-[120px]">
            <Progress 
              percent={percentage} 
              size="small"
              strokeColor={{
                '0%': '#3b82f6',
                '100%': '#10b981',
              }}
            />
          </div>
        );
      },
      width: 150,
    },
  ];

  return (
    <Table
      rowKey="userId"
      dataSource={data}
      columns={columns}
      loading={loading}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} users`
      }}
      className="modern-table"
    />
  );
}