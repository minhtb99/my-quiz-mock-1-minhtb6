/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Form, Input, message, Radio, Row, Space, Spin } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createQuestion } from '../../apis/Question'

export default function AddQuestion() {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const onFinish = async (values) => {
        setLoading(true)
        const question = { ...values, correctanswer: values[values.correctanswer] }
        await createQuestion(question)
        message.success('Add Question Successfully !');
        navigate('/manage-quiz')
    }

    const onFinishFailed = () => {

    }
    return (
        <div>
            <Row justify='center'>
                <h1>Add Question</h1>
            </Row>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 9,
                }}
                initialValues={{
                    correctanswer: 'answer1',
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Question"
                    name="question"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your question!',
                        },
                    ]}
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item
                    label="Answer 1"
                    name="answer1"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Answer 1!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Answer 2"
                    name="answer2"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Answer 2!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Answer 3"
                    name="answer3"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Answer 3!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Answer 4"
                    name="answer4"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Answer 4!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item name="correctanswer" label="Correct Answer"
                    rules={[{ required: true, message: 'Please pick an answer!' }]}>
                    <Radio.Group>
                        <Radio value="answer1">Answer 1</Radio>
                        <Radio value="answer2">Answer 2</Radio>
                        <Radio value="answer3">Answer 3</Radio>
                        <Radio value="answer4">Answer 4</Radio>
                    </Radio.Group>
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
                        {loading && (<Spin size="large" style={{ marginLeft: 30 }} />)}
                    </Space>
                </Form.Item>
            </Form></div>
    )
}
