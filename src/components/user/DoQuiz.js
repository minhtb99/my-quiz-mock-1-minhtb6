/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Card, Radio, Row, Space, Spin } from 'antd';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { authLogout } from '../../apis/Auth';
import { getQuestionUsers, submitAnswers } from '../../apis/Question';
import { getCookie, removeCookieAll } from '../../utilities/Cookie';

export default function DoQuiz({ numberQuestion }) {
  const [questions, setQuestion] = useState([])
  const [questionIndex, setQuestionIndex] = useState(0)
  const [loading, setLoading] = useState(false);
  const [loadingResult, setLoadingResult] = useState(false);

  const answers = useRef([])
  const totalQuestion = useRef(0)
  const navigate = useNavigate();

  const onRadioChange = (e) => {
    answers.current[questionIndex].correctanswer = e.target.value
  }

  const getQustionApi = async (numberQuestion) => {
    setLoading(true)
    const { success, data } = await getQuestionUsers(numberQuestion)
    if (success) {
      totalQuestion.current = data.results.length
      answers.current = data.results.map(question => {
        return {
          id: question.id,
          correctanswer: question.answer1
        }
      })
      setQuestion(data.results)
      setLoading(false)
    } else {
      alert(data)
    }
  }

  useEffect(() => {
    getQustionApi(numberQuestion)
  }, [numberQuestion])

  const userSubmit = async (listAns) => {
    setLoadingResult(true)
    const { success, data } = await submitAnswers(listAns);
    if (success) {
      const score = data.filter(result => result.result).length
      Swal.fire(
        `${score}/${data.length}`,
        'Click to close !',
        'success'
      )
      setLoadingResult(false)
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
    navigate('/')
    const refreshToken = getCookie('refreshuser')
    await authLogout(refreshToken)
    removeCookieAll();

  }

  return (
    <div>
      <Row justify="center" style={{ marginTop: 10 }}>
        <div><b>Welcome: {getCookie('username')} </b><a onClick={handleLogout}>Logout</a></div>
      </Row>
      <Space align="center" direction="vertical" style={{ display: 'flex', marginTop: 100 }}>
        {loading && (<Spin style={{ marginBottom: 80 }} />)}
        {
          questions.length > 0 &&
          (<div>
            <p>{`Question ${questionIndex + 1}/${totalQuestion.current}`}</p>
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
          </div>
          )
        }
        <Space size="middle" style={{ marginTop: 30 }}>
          <Button type="primary" shape="round" disabled={questionIndex === 0} onClick={clickPrevious}> Previous </Button>
          {questionIndex === questions.length - 1 ?
            (<Button type="primary" shape="round" onClick={clickSubmit} danger> Submit</Button>)
            :
            <Button type="primary" shape="round" onClick={clickNext}> Next & Save</Button>
          }
        </Space>
        {
          loadingResult && (<Spin style={{ marginTop: 20 }} />)
        }
      </Space>
    </div>
  )
}
