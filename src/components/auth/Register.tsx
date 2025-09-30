'use client';

import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input, ConfigProvider } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';

type FieldType = {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

const Register: React.FC = () => {
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
            padding: '38px 40px',
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
              ✨
            </div>
            <h2 style={{ margin: 0, fontSize: 28, fontWeight: 600, color: '#1a1a1a' }}>
              Tạo tài khoản mới
            </h2>
          </div>

          <Form
            name="register"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item<FieldType>
              label={<span style={{ fontSize: 14, fontWeight: 500 }}>Tên đăng nhập</span>}
              name="username"
              rules={[
                { required: true, message: 'Vui lòng nhập tên đăng nhập!' },
                { min: 3, message: 'Tên đăng nhập phải có ít nhất 3 ký tự!' },
              ]}
            >
              <Input
                prefix={<UserOutlined style={{ color: '#999' }} />}
                placeholder="Nhập tên đăng nhập"
                size="large"
                style={{ borderRadius: 8 }}
              />
            </Form.Item>

            <Form.Item<FieldType>
              label={<span style={{ fontSize: 14, fontWeight: 500 }}>Email</span>}
              name="email"
              rules={[
                { required: true, message: 'Vui lòng nhập email!' },
                { type: 'email', message: 'Email không hợp lệ!' },
              ]}
            >
              <Input
                prefix={<MailOutlined style={{ color: '#999' }} />}
                placeholder="Nhập địa chỉ email"
                size="large"
                style={{ borderRadius: 8 }}
              />
            </Form.Item>

            <Form.Item<FieldType>
              label={<span style={{ fontSize: 14, fontWeight: 500 }}>Mật khẩu</span>}
              name="password"
              rules={[
                { required: true, message: 'Vui lòng nhập mật khẩu!' },
                { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: '#999' }} />}
                placeholder="Nhập mật khẩu"
                size="large"
                style={{ borderRadius: 8 }}
              />
            </Form.Item>

            <Form.Item<FieldType>
              label={<span style={{ fontSize: 14, fontWeight: 500 }}>Xác nhận mật khẩu</span>}
              name="confirmPassword"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Mật khẩu không khớp!'));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: '#999' }} />}
                placeholder="Nhập lại mật khẩu"
                size="large"
                style={{ borderRadius: 8 }}
              />
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
                Đăng ký
              </Button>
            </Form.Item>

            <div style={{ textAlign: 'center', marginTop: 24 }}>
              <span style={{ color: '#666' }}>Đã có tài khoản? </span>
              <a href="/login" style={{ color: '#667eea', fontWeight: 600 }}>
                Đăng nhập ngay
              </a>
            </div>
          </Form>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default Register;