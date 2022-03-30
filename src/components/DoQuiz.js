import { Button, Card, Radio, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react'
import { getQuestionUsers, submitAnswers } from '../apis/Question';
import { getCookie } from '../utilities/Cookie';

export default function DoQuiz() {
  const [questions, setQuestion] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0)
  const answers = useRef([]);

  const onRadioChange = (e) => {
    answers.current[questionIndex].correctanswer = e.target.value
  }

  const getQustionApi = async () => {
    const { success, data } = await getQuestionUsers();
    if (success) {
      setQuestion(data.results)
      answers.current = data.results.map(question => {
        return {
          id: question.id,
          correctanswer: question.answer1
        }
      })
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
      console.log(data);
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
    console.log(answers.current)
    userSubmit(answers.current)
  }

  return (
    <div>
      <Space align="center" style={{ width: 30, display: 'flex' }} >
        <div>{getCookie('username')}</div>
      </Space>
      <Space align="center" direction="vertical" style={{ display: 'flex' }}>
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
