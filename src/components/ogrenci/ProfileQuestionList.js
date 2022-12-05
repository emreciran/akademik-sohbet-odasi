import { Box, Card } from '@mui/material';
import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Header from '../Header';

const ProfileQuestionList = ({ user }) => {
    const location = useLocation()
    const { userDetails } = useSelector(state => state.auth)
    const axiosPrivate = useAxiosPrivate();
    const [questions, setQuestions] = useState();
    
    const userID = location.pathname === "/profile" ? userDetails?.user_ID : user?.user_ID

    const GetQuestions = async () => {
        const questions = await axiosPrivate.get(`/questions/user/${userID}`)
        setQuestions(questions.data)
    }

    useEffect(() => {
        GetQuestions()
    }, [])

  return (
    <div>
        <Header title='Sorular' />
        {questions?.map((question) => (
            <Link key={question.question_ID} to={`/soru/${question.question_ID}/${question.title.toLowerCase().replace(/[^\w-]+/g, '-')}`}>
                <Card sx={{ minWidth: 275, backgroundColor: 'transparent' }} className="pt-4 pb-4 pl-8 pr-8 mb-2 text-center" display='flex' flexDirection='column'>
                    {question.title}
                </Card>
            </Link>
        ))}
    </div>
  )
}

export default ProfileQuestionList