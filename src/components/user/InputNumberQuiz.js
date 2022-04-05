/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Form, Input, InputNumber, Row } from 'antd';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authLogout } from '../../apis/Auth';
import { getCookie, removeCookieAll } from '../../utilities/Cookie';

export default function InputNumberQuiz() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinish = (values) => {
        dispatch({ type: 'SET_NUMBER_QUESTIONS', payload: values.numbersquestion })
        navigate('/do-quiz')
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleLogout = async () => {
        const refreshToken = getCookie('refreshuser')
        await authLogout(refreshToken)
        removeCookieAll();
        navigate('/')
    }
    return (
        <div>
            <Row justify="center" style={{ marginTop: 10 }}>
                <div><b>Welcome: {getCookie('username')} </b><a onClick={handleLogout}>Logout</a></div>
            </Row>
            <Row justify="center" style={{ marginTop: 10 }}>
                <h1>Number of questions want do!</h1>
            </Row>
            <Form
                style={{ marginTop: 30 }}
                name="basic"
                labelCol={{
                    span: 10,
                }}
                wrapperCol={{
                    span: 6,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Number Of Question"
                    name="numbersquestion"
                    rules={[
                        {
                            required: true,
                            message: 'Please input number of qustions!',
                        },
                        {
                            type: 'number',
                            message: 'Please input a number > 0',
                            min: 1
                        }
                    ]}
                >
                    <InputNumber style={{ width: 400 }} />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 10,
                        span: 10,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>

        </div>
    )
}
