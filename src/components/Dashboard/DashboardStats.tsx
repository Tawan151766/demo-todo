import { Card, Statistic } from "antd";

interface DashboardStatsProps {
  total: number;
  completed: number;
  pending: number;
  loading: boolean;
}

export default function DashboardStats({ total, completed, pending, loading }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <Card>
        <Statistic title="Total Todos" value={total} loading={loading} />
      </Card>
      <Card>
        <Statistic title="Completed" value={completed} loading={loading} />
      </Card>
      <Card>
        <Statistic title="Pending" value={pending} loading={loading} />
      </Card>
    </div>
  );
}