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
      title: "No",
      key: "index",
      render: (_: unknown, __: User, index: number) => (
        <span className="font-semibold text-gray-600">{index + 1}</span>
      ),
      width: 60,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => (
        <span className="font-medium text-gray-900">{text}</span>
      ),
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      render: (text: string) => (
        <span className="font-medium text-gray-900">{text}</span>
      ),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (text: string) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
            <span className="text-indigo-600 text-sm font-medium">
              {text?.[0]?.toUpperCase()}
            </span>
          </div>
          <span className="text-gray-900">{text}</span>
        </div>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => (
        <Tag
          color={role === "admin" ? "gold" : "blue"}
          className="px-3 py-1 rounded-full font-medium"
        >
          {role === "admin" ? "Admin" : "User"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      render: (_: unknown, record: User) => (
        <Space size="small">
          <Button
            type="default"
            size="small"
            className="border-blue-300 text-blue-600 hover:bg-blue-50"
            onClick={() => openModalUSer(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete user?"
            description="Are you sure you want to delete this user?"
            onConfirm={() => onDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger size="small" className="hover:bg-red-50">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
      width: 120,
    },
  ];

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={users}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} of ${total} users`,
      }}
      className="modern-table"
    />
  );
}
