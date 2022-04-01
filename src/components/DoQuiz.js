/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Card, Radio, Row, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { authLogout } from '../apis/Auth';
import { getQuestionUsers, submitAnswers } from '../apis/Question';
import { getCookie, removeCookieAll } from '../utilities/Cookie';

export default function DoQuiz() {
  const [questions, setQuestion] = useState([])
  const [questionIndex, setQuestionIndex] = useState(0)
  const answers = useRef([])
  const navigate = useNavigate();

  const onRadioChange = (e) => {
    answers.current[questionIndex].correctanswer = e.target.value
  }

  const getQustionApi = async () => {
    const { success, data } = await getQuestionUsers();
    if (success) {
      answers.current = data.results.map(question => {
        return {
          id: question.id,
          correctanswer: question.answer1
        }
      })
      setQuestion(data.results)
    } else {
      alert(data)
    }
  }

  useEffect(() => {
    getQustionApi()
  }, [])

  const userSubmit = async (listAns) => {
    const { success, data } = await submitAnswers(listAns);
    if (success) {
      const score = data.filter(result => result.result).length
      Swal.fire(
        `${score}/${data.length}`,
        'Click to exit !',
        'success'
      )
    } else {
      alert(data)
    }
  }

  const clickNext = () => {
    setQuestionIndex((questionIndex) => questionIndex + 1)
  }

  const clickPrevious = () => {
    setQuestionIndex((questionIndex) => questionIndex - 1)
  }

  const clickSubmit = () => {
    userSubmit(answers.current)
  }

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
      <Space align="center" direction="vertical" style={{ display: 'flex', marginTop: 100 }}>
        {
          questions.length > 0 &&
          (
            <Card title={questions[questionIndex]?.question} style={{ width: 1000 }}>
              <Radio.Group defaultValue={answers.current[questionIndex]?.correctanswer} onChange={onRadioChange} key={questions[questionIndex].id}>
                <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                  <Radio value={questions[questionIndex].answer1}>{questions[questionIndex].answer1}</Radio>
                  <Radio value={questions[questionIndex].answer2}>{questions[questionIndex].answer2}</Radio>
                  <Radio value={questions[questionIndex].answer3}>{questions[questionIndex].answer3}</Radio>
                  <Radio value={questions[questionIndex].answer4}>{questions[questionIndex].answer4}</Radio>
                </Space>
              </Radio.Group>
            </Card>
          )
        }
        <Space size="middle" style={{ marginTop: 30 }}>
          <Button type="primary" shape="round" disabled={questionIndex === 0} onClick={clickPrevious}> Previous </Button>
          {questionIndex === questions.length - 1 ?
            (<Button type="primary" shape="round" onClick={clickSubmit}> Submit</Button>)
            :
            <Button type="primary" shape="round" onClick={clickNext}> Next & Save</Button>
          }
        </Space>
      </Space>
    </div>
  )
}
