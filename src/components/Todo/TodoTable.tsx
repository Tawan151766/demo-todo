import { Table, Switch, Tag } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { Todo, User } from "@/core/api/api";

interface TodoTableProps {
  todos: Todo[];
  loading: boolean;
  onToggle: (todo: Todo) => void;
}

export default function TodoTable({
  todos,
  loading,
  onToggle,
}: TodoTableProps) {
  const columns = [
    {
      title: "No",
      key: "index",
      render: (_: unknown, __: Todo, index: number) => index + 1,
      width: 50,
    },
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Descriptions", dataIndex: "descriptions", key: "descriptions" },
    {
      title: "Assigned To",
      dataIndex: "user",
      key: "userId",
      render: (user: User) => user?.username ?? "N/A",
    },
    {
      title: "Supervisor",
      dataIndex: "supervisor",
      key: "supervisorId",
      render: (supervisor: User) => supervisor?.username ?? "N/A",
    },
    {
      title: "Score",
      dataIndex: "priority",
      render: (v: string) => (
        <Tag color={v === "high" ? "red" : v === "medium" ? "orange" : "blue"}>
          {v}
        </Tag>
      ),
    },
    {
      title: "Urgency",
      dataIndex: "urgency",
      render: (v: string) => (
        <Tag color={v === "urgent" ? "volcano" : "green"}>{v}</Tag>
      ),
    },
    {
      title: "Completed",
      dataIndex: "completed",
      key: "completed",
      render: (_: unknown, record: Todo) => (
        <Switch
          checked={record.completed}
          onChange={() => onToggle(record)}
          checkedChildren={<CheckOutlined />}
        />
      ),
    },
  ];

  return (
    <Table
      rowKey="id"
      loading={loading}
      dataSource={todos}
      columns={columns}
      pagination={{ pageSize: 5 }}
    />
  );
}
