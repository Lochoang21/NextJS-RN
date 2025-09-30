'use client';

import React from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input, ConfigProvider } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

type FieldType = {
  username?: string;
  password?: string;
  remember?: boolean;
};

const Login: React.FC = () => {
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 8,
        },
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <div
          style={{
            maxWidth: 450,
            width: '100%',
            padding: '48px 40px',
            background: '#ffffff',
            borderRadius: 16,
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div
              style={{
                width: 64,
                height: 64,
                margin: '0 auto 16px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 32,
                color: '#ffffff',
              }}
            >
              🔐
            </div>
            <h2 style={{ margin: 0, fontSize: 28, fontWeight: 600, color: '#1a1a1a' }}>
              Chào mừng trở lại
            </h2>
            <p style={{ margin: '8px 0 0', color: '#666', fontSize: 14 }}>
              Đăng nhập để tiếp tục
            </p>
          </div>

          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item<FieldType>
              label={<span style={{ fontSize: 14, fontWeight: 500 }}>Tên đăng nhập</span>}
              name="username"
              rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
            >
              <Input
                prefix={<UserOutlined style={{ color: '#999' }} />}
                placeholder="Nhập tên đăng nhập"
                size="large"
                style={{ borderRadius: 8 }}
              />
            </Form.Item>

            <Form.Item<FieldType>
              label={<span style={{ fontSize: 14, fontWeight: 500 }}>Mật khẩu</span>}
              name="password"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: '#999' }} />}
                placeholder="Nhập mật khẩu"
                size="large"
                style={{ borderRadius: 8 }}
              />
            </Form.Item>

            <Form.Item>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Form.Item<FieldType> name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Ghi nhớ đăng nhập</Checkbox>
                </Form.Item>
                <a href="/forgot-password" style={{ color: '#667eea' }}>
                  Quên mật khẩu?
                </a>
              </div>
            </Form.Item>

            <Form.Item style={{ marginBottom: 16 }}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                style={{
                  width: '100%',
                  height: 48,
                  borderRadius: 8,
                  fontSize: 16,
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                }}
              >
                Đăng nhập
              </Button>
            </Form.Item>

            <div style={{ textAlign: 'center', marginTop: 24 }}>
              <span style={{ color: '#666' }}>Chưa có tài khoản? </span>
              <a href="/register" style={{ color: '#667eea', fontWeight: 600 }}>
                Đăng ký ngay
              </a>
            </div>
          </Form>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default Login;