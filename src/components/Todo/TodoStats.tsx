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
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
      <Card>
        <Statistic
          title="Total Todos"
          value={total}
          loading={loading}
          prefix={
            <UnorderedListOutlined style={{ fontSize: 20, color: "#1e90ff" }} />
          }
        />
      </Card>

      <Card>
        <Statistic
          title="Completed"
          value={completed}
          loading={loading}
          prefix={
            <CheckCircleOutlined style={{ fontSize: 20, color: "#52c41a" }} />
          }
        />
      </Card>

      <Card>
        <Statistic
          title="Pending"
          value={pending}
          loading={loading}
          prefix={
            <ClockCircleOutlined style={{ fontSize: 20, color: "#faad14" }} />
          }
        />
      </Card>
    </div>
  );
}
