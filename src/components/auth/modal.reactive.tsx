'use client'
import { Modal, Form, Input, Button, notification, } from 'antd'
import React, { useEffect, useState } from 'react'
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { Steps } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { sendRequest } from '@/utils/api';

const ModalReactive = (props: any) => {

  const { isModalOpen, setIsModalOpen, userEmail } = props;
  const [current, setCurrent] = useState(0);
  const [userId, setUserId] = useState("");
  const [form] = useForm();

  useEffect(() => {
    if (userEmail) {
      form.setFieldValue("email", userEmail)
    }
  }, [userEmail])

  const onFinishStep0 = async (values: any) => {

    const { email } = values;

    const res = await sendRequest<IBackendRes<any>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/retry-active`,
      method: "POST",
      body: {
        email
      }
    })

    if (res.data) {
      setUserId(res.data?._id)
      setCurrent(1);
    } else {
      notification.error({
        message: "Call Api Error",
        description: res?.message
      })
    }
  }

   const onFinishStep1 = async (values: any) => {

    const { code } = values;

    const res = await sendRequest<IBackendRes<any>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/check-code`,
      method: "POST",
      body: {
        code, _id: userId
      }
    })

    if (res.data) {
      setCurrent(2);
    } else {
      notification.error({
        message: "Call Api Error",
        description: res?.message
      })
    }
  }

  return (
    <div>
      <Modal
        title="Kích hoạt tài khoản"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        maskClosable={false}
        footer={null}

      >
        <Steps current={current}
          items={[
            {
              title: 'Login',
              // status: 'finish',
              icon: <UserOutlined />,
            },
            {
              title: 'Verification',
              // status: 'finish',
              icon: <SolutionOutlined />,
            },
            {
              title: 'Done',
              // status: 'wait',
              icon: <SmileOutlined />,
            },
          ]}
        />
        {
          current === 0 &&
          <>

            <div style={{ marginTop: "20px 0" }}>
              Tài khoản của bạn chưa được kích hoạt
            </div>
            <Form
              name="verify"
              onFinish={onFinishStep0}
              autoComplete="off"
              layout='vertical'
              form={form}
            >
              <Form.Item
                label=""
                name="email"
              >
                <Input disabled value={userEmail} />
              </Form.Item>
              <Form.Item
              >
                <Button type="primary" htmlType="submit">
                  Resend
                </Button>
              </Form.Item>
            </Form>
          </>
        }
        {
          current === 1 &&

          <div>
            <div style={{ marginTop: "20px 0" }}>
              Nhập mã xác thực
            </div>
            <Form
              name="verify"
              onFinish={onFinishStep1}
              autoComplete="off"
              layout='vertical'
            >
              <Form.Item
                label="Code"
                name="code"
                rules={[
                  {
                    required: true,
                    message: 'Please input your code!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
              >
                <Button type="primary" htmlType="submit">
                  Active
                </Button>
              </Form.Item>
            </Form>
          </div>
        }
        {
          current === 2 && 
          <div>
            <div style={{ marginTop: "20px 0" }}>
              Tài khoản của bạn đã được kích hoạt thành công! Vui lòng đăng nhập
            </div>
          </div>
        }
      </Modal>
    </div>
  )
}

export default ModalReactive
