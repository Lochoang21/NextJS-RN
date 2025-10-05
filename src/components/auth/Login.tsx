'use client'
import { Button, Col, Divider, Form, Input, notification, Row } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { authenticate } from '@/utils/action';
import { useRouter } from 'next/navigation';
import ModalReactive from './modal.reactive';
import { useState } from 'react';
import ModalChangePassword from './modal.change.password';

const Login = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userEmail, setUserEmail] = useState("");

    const [changePassword, setChangePassword] = useState(false);

    const router = useRouter()

    const onFinish = async (values: any) => {
        const { username, password } = values;
        setUserEmail("");
        //trigger sign-in
        const res = await authenticate(username, password);
        console.log(">>> check response", res)
        // const data =  await signIn("credentials", {email, password, redirect: false});
        // console.log(data)
        if (res?.error) {
            if (res?.code === 2) {
                setIsModalOpen(true)
                setUserEmail(username)
                return;
            }
            notification.error({
                message: "Error Login",
                description: res?.error
            })

        } else {
            //redirect
            router.push('/dashboard');
        }
    };

    return (
        <>
            <Row justify={"center"} style={{ marginTop: "30px" }}>
                <Col xs={24} md={16} lg={8}>
                    <fieldset style={{
                        padding: "15px",
                        margin: "5px",
                        border: "1px solid #ccc",
                        borderRadius: "5px"
                    }}>
                        <legend>Đăng Nhập</legend>
                        <Form
                            name="basic"
                            onFinish={onFinish}
                            autoComplete="off"
                            layout='vertical'
                        >
                            <Form.Item
                                label="Email"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item
                            >
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}>
                                    <Button type="primary" htmlType="submit">
                                        Login
                                    </Button>
                                    <Button type='link' onClick={() => setChangePassword(true)}>Quên mật khẩu ?</Button>
                                </div>
                            </Form.Item>
                        </Form>
                        <Link href={"/"}><ArrowLeftOutlined /> Quay lại trang chủ</Link>
                        <Divider />
                        <div style={{ textAlign: "center" }}>
                            Chưa có tài khoản? <Link href={"/auth/register"}>Đăng ký tại đây</Link>
                        </div>
                    </fieldset>
                </Col>
            </Row>
            <ModalReactive
                userEmail={userEmail}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen} />

            <ModalChangePassword
                isModalOpen={changePassword}
                setIsModalOpen={setChangePassword}
            />
        </>

    )
}

export default Login;