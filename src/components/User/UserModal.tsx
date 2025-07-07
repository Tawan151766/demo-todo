"use client";

import { Modal, Form, Input, Select } from "antd";
import { User } from "@/core/api/api";

interface Props {
  open: boolean;
  editing: User | null;
  form: any;
  onOk: () => void;
  onCancel: () => void;
}

export default function UserModal({
  open,
  editing,
  form,
  onOk,
  onCancel,
}: Props) {
  return (
    <Modal
      open={open}
      title={editing ? "Edit User" : "Create User"}
      okText="Save"
      onOk={onOk}
      onCancel={onCancel}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={editing ?? { role: "user" }}
      >
        <Form.Item
          name="name"
          label="name"
          rules={[{ required: true, message: "Please input name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="lastName"
          rules={[{ required: true, message: "Please input lastName" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: "Please input username" }]}
        >
          <Input />
        </Form.Item>

        {!editing && (
          <>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: "Please input password" }]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Please confirm your password" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
          </>
        )}

        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: "Please select role" }]}
        >
          <Select
            options={[
              { value: "admin", label: "admin" },
              { value: "employee", label: "employee" },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
