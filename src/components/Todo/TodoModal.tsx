"use client";

import { Modal, Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Todo } from "../../core/api/api";
import { User } from "../../core/context/UserContext";

interface TodoModalProps {
  open: boolean;
  editing: Todo | null;
  form: import("antd").FormInstance;
  users: User[];
  onOk: () => void;
  onCancel: () => void;
}

export default function TodoModal({
  open,
  editing,
  form,
  users,
  onOk,
  onCancel,
}: TodoModalProps) {
  return (
    <Modal
      open={open}
      title={editing ? "Edit Todo" : "Add Todo"}
      onOk={onOk}
      onCancel={onCancel}
      okText={editing ? "Update" : "Add"}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please input title!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="descriptions"
          label="Descriptions"
          rules={[{ required: true, message: "Please input descriptions!" }]}
        >
          <TextArea />
        </Form.Item>
        {!editing && (
          <>
            <Form.Item
              name="userId"
              label="Assign To"
              rules={[{ required: true, message: "Please select user" }]}
            >
              <Select
                options={users.map((u) => ({ label: u.username, value: u.id }))}
              />
            </Form.Item>

            <Form.Item
              name="supervisorId"
              label="Supervisor"
              rules={[{ required: true, message: "Please select supervisor" }]}
            >
              <Select
                options={users.map((u) => ({ label: u.username, value: u.id }))}
              />
            </Form.Item>
          </>
        )}
        <Form.Item name="priority" label="Score">
          <Select
            options={[
              { value: "low", label: "Low" },
              { value: "medium", label: "Medium" },
              { value: "high", label: "High" },
            ]}
          />
        </Form.Item>

        <Form.Item name="urgency" label="Urgency">
          <Select
            options={[
              { value: "normal", label: "Normal" },
              { value: "urgent", label: "Urgent" },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
