/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Form, Input } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { authLogin } from '../apis/Auth';
import { setCookie } from '../utilities/Cookie';

export default function FormLogin() {
    const navigate = useNavigate();

    const onFinish = (values) => {
        const loadTokenToLocal = async (user) => {
            const { success, data } = await authLogin(user)
            if (success) {
               
                if (data.user.role === 'user') {
                    const tokens = data.tokens
                    setCookie('tokenuser', tokens.access.token)
                    setCookie('refreshuser', tokens.refresh.token);
                    setCookie('username', data.user.username);
                    
                    navigate('/do-quiz')
                } else {
                    navigate('/manage-quiz')
                }
            } else {
                alert(data)
            }
        }
        loadTokenToLocal(values)
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo)
    }

    return (
        <div>
            <h1 style={{ textAlign: 'center' }} >Login</h1>
            <Form className='form-login'
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
                        { min: 8, message: 'Password must be minimum 8 characters.' },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                {/* <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Checkbox>Remember me</Checkbox>
            </Form.Item> */}

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <a onClick={() => { navigate('/register') }} >Create account</a>
                </Form.Item>
            </Form>
        </div>
    )
}
