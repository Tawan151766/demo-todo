"use client";

import { Table, Button, Space, Popconfirm, Tag } from "antd";
import { User } from "@/core/context/UserContext";

interface Props {
  users: User[];
  onDelete: (id: number) => void;
  openModalUSer: (user: User) => void;
}

export default function UserTable({ users, onDelete, openModalUSer }: Props) {
  const columns = [
    {
      title: "#",
      key: "index",
      render: (_: unknown, __: User, index: number) => index + 1,
      width: 50,
    },
    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "lastName",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => (
        <Tag color={role === "admin" ? "gold" : "blue"}>{role}</Tag>
      ),
    },
    {
      title: "Action",
      render: (_: unknown, record: User) => (
        <Space>
          <Button onClick={() => openModalUSer(record)}>Edit</Button>
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => onDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={users}
      pagination={false}
    />
  );
}
