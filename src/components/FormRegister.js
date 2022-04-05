/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Form, Input, notification, Space, Spin } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { authRegister } from '../apis/Auth';
import { SmileOutlined } from '@ant-design/icons';

export default function FormRegister() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const onFinish = (values) => {
        delete values.rePassword;
        const authRegisterApi = async (user) => {
            const { success, data } = await authRegister(user);
            if (success) {
                openNotification();
                navigate('/')
            } else {
                alert(data)
            }
        }
        authRegisterApi(values)
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }

    const openNotification = () => {
        notification.open({
            message: 'Registers account successfully',
            description:
                'Your account has been successfully registered, log in to take the test ',
            icon: <SmileOutlined style={{ color: '#108ee9' }} />,
            duration: 7,
        });
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center', marginTop: 100 }} >Registers</h1>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 10,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                        {
                            type: 'email',
                            message: 'Please input a valid email ex:"abc@example.com"'
                        }
                    ]}
                    hasFeedback
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
                        {
                            min: 8,
                            message: 'Password must be minimum 8 characters.'
                        },
                        {
                            pattern: new RegExp('^(?=.*[a-z])(?=.*[0-9])'),
                            message: 'Password must contain at least 1 letter and 1 number'
                        }
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Re-password"
                    name="rePassword"
                    dependencies={['password']}
                    rules={[
                        {
                            required: true,
                            message: 'Please input your re-password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve()
                                }
                                return Promise.reject("Re-password is not match!")
                            }
                        })
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Space>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <a onClick={() => { navigate('/') }} >Do you have account aready?</a>
                        {loading && (<Spin />)}
                    </Space>
                </Form.Item>
            </Form>
        </div>
    )
}
