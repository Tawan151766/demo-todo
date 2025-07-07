"use client";

import React, { useContext, useState } from "react";
import { Typography, message } from "antd";
import { useRouter } from "next/navigation";
import { login as loginApi, LoginPayload } from "../../core/api/api";
import { AuthContext } from "../../core/context/AuthContext";
import LoginForm from "../../components/Auth/LoginForm";

const { Title } = Typography;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const auth = useContext(AuthContext);

  const onFinish = async (values: LoginPayload) => {
    setLoading(true);
    try {
      const data = await loginApi(values);
      auth.login(data.accessToken, data.user);
      message.success("Login successful");
      router.push("/");
    } catch {
      message.error("Invalid credentials or server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "100px auto",
        padding: 24,
        background: "#fff",
        borderRadius: 8,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      }}
    >
      <Title level={3} style={{ textAlign: "center" }}>
        Login
      </Title>
      <LoginForm loading={loading} onFinish={onFinish} />
    </div>
  );
}
