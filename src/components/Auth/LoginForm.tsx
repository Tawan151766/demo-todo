import { Form, Input, Button } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { LoginPayload } from "../../core/api/api";

interface LoginFormProps {
  loading: boolean;
  onFinish: (values: LoginPayload) => void;
}

export default function LoginForm({ loading, onFinish }: LoginFormProps) {
  const [form] = Form.useForm();
  return (
    <Form name="login" onFinish={onFinish} layout="vertical" form={form}>
      <Form.Item
        name="username"
        label="Username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Username" />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Password" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block loading={loading}>
          Login
        </Button>
      </Form.Item>
    </Form>
  );
}
