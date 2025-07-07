import { Card, Table } from "antd";
import { AdminSummaryAllItem } from "@/core/api/api";

interface DashboardUserTableProps {
  data: AdminSummaryAllItem[];
  loading: boolean;
}

export default function DashboardUserTable({ data, loading }: DashboardUserTableProps) {
  const columns = [
    { title: "User", dataIndex: "username", key: "username" },
    { title: "Total Todos", dataIndex: "total", key: "total" },
    {
      title: "Completed",
      dataIndex: "completed",
      key: "completed",
      render: (v: number) => `${v}`,
    },
    {
      title: "Pending",
      key: "pending",
      render: (_: any, r: AdminSummaryAllItem) => r.total - r.completed,
    },
  ];

  return (
    <Card title="Todos per User">
      <Table
        rowKey="userId"
        dataSource={data}
        columns={columns}
        loading={loading}
        pagination={false}
      />
    </Card>
  );
}