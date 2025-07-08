"use client";

import { Modal, Form, Input, Select, FormInstance } from "antd";
import { User } from "@/core/api/api";

interface Props {
  open: boolean;
  editing: User | null;
  form: FormInstance;
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
      title={
        <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
          <span className="text-xl font-semibold text-gray-800">
            {editing ? "Edit User" : "Create New User"}
          </span>
        </div>
      }
      okText={editing ? "Update User" : "Create User"}
      cancelText="Cancel"
      onOk={onOk}
      onCancel={onCancel}
      width={500}
      className="modern-modal"
      okButtonProps={{
        size: "large",
        className: "h-10 px-6 font-medium"
      }}
      cancelButtonProps={{
        size: "large", 
        className: "h-10 px-6"
      }}
    >
      <div className="pt-6">
        <Form
          form={form}
          layout="vertical"
          requiredMark={false}
          initialValues={editing ?? { role: "employee" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="name"
              label={<span className="text-gray-700 font-medium">First Name</span>}
              rules={[{ required: true, message: "Please input first name" }]}
            >
              <Input 
                size="large"
                placeholder="Enter first name..."
                className="rounded-lg"
              />
            </Form.Item>
            
            <Form.Item
              name="lastName"
              label={<span className="text-gray-700 font-medium">Last Name</span>}
              rules={[{ required: true, message: "Please input last name" }]}
            >
              <Input 
                size="large"
                placeholder="Enter last name..."
                className="rounded-lg"
              />
            </Form.Item>
          </div>

          <Form.Item
            name="username"
            label={<span className="text-gray-700 font-medium">Username</span>}
            rules={[{ required: true, message: "Please input username" }]}
          >
            <Input 
              size="large"
              placeholder="Enter username..."
              className="rounded-lg"
            />
          </Form.Item>

          {!editing && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                name="password"
                label={<span className="text-gray-700 font-medium">Password</span>}
                rules={[{ required: true, message: "Please input password" }]}
                hasFeedback
              >
                <Input.Password 
                  size="large"
                  placeholder="Enter password..."
                  className="rounded-lg"
                />
              </Form.Item>

              <Form.Item
                name="confirm"
                label={<span className="text-gray-700 font-medium">Confirm Password</span>}
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
                <Input.Password 
                  size="large"
                  placeholder="Confirm password..."
                  className="rounded-lg"
                />
              </Form.Item>
            </div>
          )}

          <Form.Item
            name="role"
            label={<span className="text-gray-700 font-medium">Role</span>}
            rules={[{ required: true, message: "Please select role" }]}
          >
            <Select
              size="large"
              placeholder="Select user role..."
              className="rounded-lg"
              options={[
                { 
                  value: "admin", 
                  label: "Administrator"
                },
                { 
                  value: "employee", 
                  label: "Employee"
                },
              ]}
            />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}
