/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Col, message, Pagination, Popconfirm, Row, Space, Spin, Table } from 'antd';
import Column from 'antd/lib/table/Column';
import React, { useEffect, useRef, useState } from 'react'
import { deleteQuestionById, getQuestionAdmin } from '../../apis/Question'
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export default function ManageQuiz() {
  const [listQuestion, setListQuestion] = useState([])
  const [pageIndex, setPageIndex] = useState(1);
  const [loading, setLoading] = useState(false)
  const totalPages = useRef(0);


  const _getQuestion = async (page) => {
    setLoading(true)
    const { success, data } = await getQuestionAdmin(page)
    if (success) {
      totalPages.current = data.totalPages;
      setListQuestion(data.results)
      setLoading(false)
    }
  }

  const navigate = useNavigate()

  useEffect(() => {
    _getQuestion(pageIndex)
  }, [pageIndex])

  const clickDetail = (idQuestion) => {
    navigate('/question-detail/' + idQuestion)
  }

  const clickDelete = async (idQuestion) => {
    await deleteQuestionById(idQuestion)
    await _getQuestion(pageIndex)
    message.success('Delete Successfully !');
  }

  const onChangePage = (pageNumber) => {
    setPageIndex(pageNumber);
  }

  const cancel = () => {
    message.success('Cancel delete question !');
  }

  const clickAddQuestion = () => {
    navigate('/add-question')
  }

  return (
    <div>
      {
        listQuestion.length > 0 &&
        (
          <Row justify="center" align='middle'>
            <Col span={22}>
              <Space align="center" style={{ marginBottom: 16, marginTop: 10 }}>
                <Button type="primary" shape="round" icon={<PlusOutlined />} size='large' onClick={clickAddQuestion}>Add Question</Button>
              </Space>
              <Table
                dataSource={listQuestion.map((
                  (question, index) => (
                    {
                      key: question.id,
                      index: index + 1,
                      question: question.question
                    }
                  )
                ))}
                pagination={false}
              >
                <Column title="" dataIndex="index" key="index" />
                <Column title="Question" dataIndex="question" key="question" />
                <Column
                  title="Action"
                  key="action"
                  render={(text, record) => (
                    <Space size="middle">
                      <a onClick={() => { clickDetail(record.key) }}>Detail</a>
                      <Popconfirm
                        title="Are you sure to delete this question?"
                        onConfirm={() => { clickDelete(record.key) }}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <a>Delete</a>
                      </Popconfirm>
                    </Space>
                  )}
                />
              </Table>
              <Row justify='end' style={{ marginTop: 10 }}>
                <Pagination defaultCurrent={1} total={totalPages.current * 10} onChange={onChangePage} />
              </Row>
            </Col>
          </Row>
        )
      }
      <Row justify='center'>
        {loading && (<Spin size="large" style={{ marginTop: 100 }} />)}
      </Row>
    </div >
  )
}
