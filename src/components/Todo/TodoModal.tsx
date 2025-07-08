"use client";

import { Modal, Form, Input, Select, FormInstance } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Todo } from "../../core/api/api";
import { User } from "../../core/context/UserContext";

interface TodoModalProps {
  open: boolean;
  editing: Todo | null;
  form: FormInstance;
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
      title={
        <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
          <span className="text-xl font-semibold text-gray-800">
            {editing ? "Edit Todo" : "Create New Todo"}
          </span>
        </div>
      }
      onOk={onOk}
      onCancel={onCancel}
      okText={editing ? "Update Todo" : "Create Todo"}
      cancelText="Cancel"
      width={600}
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
        <Form form={form} layout="vertical" requiredMark={false}>
          <Form.Item
            name="title"
            label={<span className="text-gray-700 font-medium">Title</span>}
            rules={[{ required: true, message: "Please input title!" }]}
          >
            <Input 
              size="large"
              placeholder="Enter todo title..."
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item
            name="descriptions"
            label={<span className="text-gray-700 font-medium">Description</span>}
            rules={[{ required: true, message: "Please input descriptions!" }]}
          >
            <TextArea 
              rows={4}
              placeholder="Enter detailed description..."
              className="rounded-lg"
            />
          </Form.Item>
          
          {!editing && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                name="userId"
                label={<span className="text-gray-700 font-medium">Assign To</span>}
                rules={[{ required: true, message: "Please select user" }]}
              >
                <Select
                  size="large"
                  placeholder="Select user..."
                  className="rounded-lg"
                  options={users.map((u) => ({ 
                    label: (
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 text-xs font-medium">
                            {u.username?.[0]?.toUpperCase()}
                          </span>
                        </div>
                        {u.username}
                      </div>
                    ), 
                    value: u.id 
                  }))}
                />
              </Form.Item>

              <Form.Item
                name="supervisorId"
                label={<span className="text-gray-700 font-medium">Supervisor</span>}
                rules={[{ required: true, message: "Please select supervisor" }]}
              >
                <Select
                  size="large"
                  placeholder="Select supervisor..."
                  className="rounded-lg"
                  options={users.map((u) => ({ 
                    label: (
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 text-xs font-medium">
                            {u.username?.[0]?.toUpperCase()}
                          </span>
                        </div>
                        {u.username}
                      </div>
                    ), 
                    value: u.id 
                  }))}
                />
              </Form.Item>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item name="priority" label={<span className="text-gray-700 font-medium">Priority</span>}>
              <Select
                size="large"
                placeholder="Select priority..."
                className="rounded-lg"
                options={[
                  { value: "low", label: "Low Priority" },
                  { value: "medium", label: "Medium Priority" },
                  { value: "high", label: "High Priority" },
                ]}
              />
            </Form.Item>

            <Form.Item name="urgency" label={<span className="text-gray-700 font-medium">Urgency</span>}>
              <Select
                size="large"
                placeholder="Select urgency..."
                className="rounded-lg"
                options={[
                  { value: "normal", label: "Normal" },
                  { value: "urgent", label: "Urgent" },
                ]}
              />
            </Form.Item>
          </div>
        </Form>
      </div>
    </Modal>
  );
}
