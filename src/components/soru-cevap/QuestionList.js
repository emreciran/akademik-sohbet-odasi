import React from 'react'
import QuestionItem from './QuestionItem'
import { Grid  } from '@mui/material'

const QuestionList = ({ questions }) => {
  return (
    <>
        {questions?.map((question) => (
            <Grid item xs={12} md={6} key={question.question_ID}>
                <QuestionItem question={question} />
            </Grid>
        ))}
    </>
  )
}

export default QuestionList