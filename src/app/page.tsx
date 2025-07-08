"use client";

import { useContext, useEffect, useState } from "react";
import {
  Table,
  Button,
  Form,
  Switch,
  Tag,
  Space,
  Popconfirm,
  Tabs,
} from "antd";
import { PlusOutlined, CheckOutlined } from "@ant-design/icons";
import ProtectedRoute from "../components/Auth/ProtectedRoute";
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  Todo,
  updateTodoStatus,
  AddUserPayload,
  addUser,
  updateUser,
  UpdateUserPayload,
  deleteUser,
} from "../core/api/api";
import { AuthContext } from "../core/context/AuthContext";
import { User, UserContext } from "../core/context/UserContext";
import TodoModal from "../components/Todo/TodoModal";
import UserTable from "../components/User/UserTable";
import UserModal from "../components/User/UserModal";

export default function Home() {
  const { token } = useContext(AuthContext);
  const { users, refreshUsers } = useContext(UserContext);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const [todoForm] = Form.useForm();
  const [userForm] = Form.useForm();

  useEffect(() => {
    loadTodos();
    refreshUsers();
  }, [token]);

  const loadTodos = async () => {
    const accessToken = token || localStorage.getItem("token");
    if (!accessToken) return;
    setLoading(true);
    try {
      const list = await getTodos(accessToken);
      setTodos(list);
    } catch {
      console.log("Failed to load todos");
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setOpen(null);
    setEditingTodo(null);
    setEditingUser(null);

    // Safe form reset with error handling
    try {
      todoForm?.resetFields();
    } catch (error) {
      console.warn("Error resetting todo form:", error);
    }

    try {
      userForm?.resetFields();
    } catch (error) {
      console.warn("Error resetting user form:", error);
    }
  };

  const handleTodoOk = async () => {
    try {
      const values = await todoForm.validateFields();
      const accessToken = token || localStorage.getItem("token");
      if (!accessToken) return;

      if (editingTodo) {
        await updateTodo(accessToken, editingTodo.id, values);
      } else {
        await addTodo(accessToken, values);
      }

      closeModal();
      loadTodos();
    } catch (error) {
      console.error("Error handling todo form:", error);
    }
  };

  const handleUserOk = async () => {
    try {
      const values = await userForm.validateFields();
      const accessToken = token || localStorage.getItem("token");
      if (!accessToken) return;

      if (editingUser) {
        await updateUser(
          editingUser.id,
          accessToken,
          values as UpdateUserPayload
        );
        refreshUsers();
      } else {
        await addUser(accessToken, values as AddUserPayload);
        refreshUsers();
      }

      closeModal();
    } catch (error) {
      console.error("Error handling user form:", error);
    }
  };

  const handleDeleteTodo = async (todo: Todo) => {
    const accessToken = token || localStorage.getItem("token");
    if (!accessToken) return;
    await deleteTodo(accessToken, todo.id);
    loadTodos();
  };

  const handleToggle = async (todo: Todo) => {
    const accessToken = token || localStorage.getItem("token");
    if (!accessToken) return;
    const updated = await updateTodoStatus(
      accessToken,
      todo.id,
      !todo.completed
    );
    setTodos((prev) =>
      prev.map((t) =>
        t.id === todo.id ? { ...t, completed: updated.completed } : t
      )
    );
  };
  const handleDeleteUser = async (user: User) => {
    const accessToken = token || localStorage.getItem("token");
    if (!accessToken) return;
    await deleteUser(accessToken, user.id);
    refreshUsers();
  };

  const todoColumns = [
    {
      title: "No",
      key: "index",
      render: (_: unknown, __: Todo, index: number) => (
        <span className="font-semibold text-gray-600">{index + 1}</span>
      ),
      width: 60,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text: string) => (
        <span className="font-medium text-gray-900">{text}</span>
      ),
    },
    {
      title: "Description",
      dataIndex: "descriptions",
      key: "descriptions",
      render: (text: string) => (
        <span className="text-gray-600 max-w-xs truncate block">{text}</span>
      ),
    },
    {
      title: "Assigned To",
      dataIndex: "user",
      key: "userId",
      render: (user: User) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 text-sm font-medium">
              {user?.username?.[0]?.toUpperCase() || "N"}
            </span>
          </div>
          <span className="text-gray-900">{user?.username ?? "N/A"}</span>
        </div>
      ),
    },
    {
      title: "Supervisor",
      dataIndex: "supervisor",
      key: "supervisorId",
      render: (supervisor: User) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-green-600 text-sm font-medium">
              {supervisor?.username?.[0]?.toUpperCase() || "N"}
            </span>
          </div>
          <span className="text-gray-900">{supervisor?.username ?? "N/A"}</span>
        </div>
      ),
    },
    {
      title: "Priority",
      dataIndex: "priority",
      render: (v: string) => (
        <Tag
          color={v === "high" ? "red" : v === "medium" ? "orange" : "blue"}
          className="px-3 py-1 rounded-full font-medium"
        >
          {v?.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Urgency",
      dataIndex: "urgency",
      render: (v: string) => (
        <Tag
          color={v === "urgent" ? "volcano" : "green"}
          className="px-3 py-1 rounded-full font-medium"
        >
          {v?.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "completed",
      render: (_: unknown, record: Todo) => (
        <Switch
          checked={record.completed}
          onChange={() => handleToggle(record)}
          checkedChildren={<CheckOutlined />}
          className="shadow-sm"
        />
      ),
      width: 100,
    },
    {
      title: "Actions",
      render: (_: unknown, record: Todo) => (
        <Space size="small">
          <Button
            type="default"
            size="small"
            className="border-blue-300 text-blue-600 hover:bg-blue-50"
            onClick={() => {
              setEditingTodo(record);
              todoForm.setFieldsValue({
                title: record.title,
                descriptions: record.descriptions,
                userId: record.userId,
                supervisorId: record.supervisorId,
                priority: record.priority,
                urgency: record.urgency,
              });
              setOpen("todoModal");
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete task?"
            description="Are you sure you want to delete this task?"
            onConfirm={() => handleDeleteTodo(record)}
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
      // fixed: "right",
    },
  ];

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">
              Manage your todos and users efficiently
            </p>
          </div>
          <Tabs
            defaultActiveKey="todos"
            size="large"
            className="bg-white rounded-xl shadow-sm border-0"
            tabBarStyle={{
              margin: 0,
              padding: "0 24px",
              borderBottom: "1px solid #f0f0f0",
            }}
            items={[
              {
                key: "todos",
                label: (
                  <span className="flex items-center gap-2 px-2 py-1">
                    Todos
                  </span>
                ),
                children: (
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                          Todo Management
                        </h2>
                        <p className="text-gray-600 mt-1">
                          Track and manage all tasks
                        </p>
                      </div>
                      <Button
                        type="primary"
                        size="large"
                        icon={<PlusOutlined />}
                        className="shadow-md hover:shadow-lg transition-shadow"
                        onClick={() => {
                          setEditingTodo(null);
                          try {
                            todoForm.resetFields();
                          } catch (error) {
                            console.warn("Error resetting form:", error);
                          }
                          setOpen("todoModal");
                        }}
                      >
                        Create New Todo
                      </Button>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                      <Table
                        rowKey="id"
                        columns={todoColumns}
                        dataSource={todos}
                        loading={loading}
                        pagination={{
                          pageSize: 10,
                          showSizeChanger: true,
                          showQuickJumper: true,
                          showTotal: (total, range) =>
                            `${range[0]}-${range[1]} of ${total} items`,
                        }}
                        className="modern-table"
                      />
                    </div>
                  </div>
                ),
              },
              {
                key: "users",
                label: (
                  <span className="flex items-center gap-2 px-2 py-1">
                    User Management
                  </span>
                ),
                children: (
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                          User Management
                        </h2>
                        <p className="text-gray-600 mt-1">
                          Manage system users and roles
                        </p>
                      </div>
                      <Button
                        type="primary"
                        size="large"
                        icon={<PlusOutlined />}
                        className="shadow-md hover:shadow-lg transition-shadow"
                        onClick={() => {
                          setEditingUser(null);
                          try {
                            userForm.resetFields();
                          } catch (error) {
                            console.warn("Error resetting form:", error);
                          }
                          setOpen("userModal");
                        }}
                      >
                        Add New User
                      </Button>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                      <UserTable
                        users={users}
                        onDelete={(id: number) => {
                          const user = users.find((u) => u.id === id);
                          if (user) handleDeleteUser(user);
                        }}
                        openModalUSer={(user) => {
                          setEditingUser(user);
                          userForm.setFieldsValue(user);
                          setOpen("userModal");
                        }}
                      />
                    </div>
                  </div>
                ),
              },
            ]}
          />{" "}
          {todoForm && (
            <TodoModal
              open={open === "todoModal"}
              editing={editingTodo}
              form={todoForm}
              users={users}
              onOk={handleTodoOk}
              onCancel={closeModal}
            />
          )}
          {userForm && (
            <UserModal
              open={open === "userModal"}
              editing={editingUser}
              form={userForm}
              onOk={handleUserOk}
              onCancel={closeModal}
            />
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
