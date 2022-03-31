import React, { useEffect, useRef, useState } from 'react'
import { getQuestionAdmin } from '../apis/Question'

export default function ManageQuiz() {
  const [listQuestion, setListQuestion] = useState([])
  const [pageIndex, setPageIndex] = useState(1);
  const totalPages = useRef(0);

  const _getQuestion = async (page) => {
    const { success, data } = await getQuestionAdmin(page)
    if (success) {
      setListQuestion(data.results)
      totalPages.current = data.totalPages;
    }
  }

  useEffect(() => {
    _getQuestion(pageIndex)
  }, [pageIndex])


  return (
    <div>{
      listQuestion.length > 0 &&
      listQuestion.map((question => (
        <p>{question.question}</p>
      )))}
    </div>
  )
}
