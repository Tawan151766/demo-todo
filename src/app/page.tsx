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
    todoForm.resetFields();
    userForm.resetFields();
  };

  const handleTodoOk = async () => {
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
  };

  const handleUserOk = async () => {
    const payloadCrete = (await userForm.validateFields()) as AddUserPayload;
    const payloadUpdate =
      (await userForm.validateFields()) as UpdateUserPayload;
    const accessToken = token || localStorage.getItem("token");
    if (!accessToken) return;

    if (editingUser) {
      await updateUser(editingUser.id, accessToken, payloadUpdate);
      refreshUsers();
    } else {
      await addUser(accessToken, payloadCrete);
      refreshUsers();
    }

    closeModal();
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
      title: "#",
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
      render: (_: unknown, record: Todo) => (
        <Switch
          checked={record.completed}
          onChange={() => handleToggle(record)}
          checkedChildren={<CheckOutlined />}
        />
      ),
    },
    {
      title: "Action",
      render: (_: unknown, record: Todo) => (
        <Space>
          <Button
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
            onConfirm={() => handleDeleteTodo(record)}
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen p-8">
        <Tabs
          defaultActiveKey="todos"
          size="large"
          items={[
            {
              key: "todos",
              label: "Todos",
              children: (
                <>
                  <div className="flex justify-between mb-4">
                    <h2 className="text-xl font-semibold">Todo List</h2>
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={() => {
                        setEditingTodo(null);
                        todoForm.resetFields();
                        setOpen("todoModal");
                      }}
                    >
                      New Todo
                    </Button>
                  </div>

                  <Table
                    rowKey="id"
                    columns={todoColumns}
                    dataSource={todos}
                    loading={loading}
                    pagination={false}
                  />
                </>
              ),
            },
            {
              key: "users",
              label: "User Management",
              children: (
                <>
                  <div className="flex justify-between mb-4">
                    <h2 className="text-xl font-semibold">User List</h2>
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={() => {
                        setEditingUser(null);
                        userForm.resetFields();
                        setOpen("userModal");
                      }}
                    >
                      New User
                    </Button>
                  </div>
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
                </>
              ),
            },
          ]}
        />

        <TodoModal
          open={open === "todoModal"}
          editing={editingTodo}
          form={todoForm}
          users={users}
          onOk={handleTodoOk}
          onCancel={closeModal}
        />

        <UserModal
          open={open === "userModal"}
          editing={editingUser}
          form={userForm}
          onOk={handleUserOk}
          onCancel={closeModal}
        />
      </div>
    </ProtectedRoute>
  );
}
