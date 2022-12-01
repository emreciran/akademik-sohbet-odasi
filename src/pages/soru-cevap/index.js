import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import Header from '../../components/Header';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { tokens } from '../../theme';
import { Box, Typography, useTheme, Grid } from '@mui/material'
import QuestionItem from '../../components/soru-cevap/QuestionItem';
import QuestionList from '../../components/soru-cevap/QuestionList';
import { Link } from 'react-router-dom';

const SoruCevap = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const axiosPrivate = useAxiosPrivate();

    const [questions, setQuestions] = useState()

    const GetQuestions = async() => {
        const questionsData = await axiosPrivate.get('/questions')
        setQuestions(questionsData.data)
    }

    useEffect(() => {
        GetQuestions()
    }, [])

    return (
        <Box m='20px' className='max-md:pl-20'>
            <Box display='flex' justifyContent="space-between" >
                <Header title='Son Sorular' />
                <Link to='/soru-sor' className="w-32 mt-2 hover:bg-[#544ede] rounded-md bg-[#6A64F1] py-2 px-8 text-center text-base font-semibold text-white outline-none">Soru Sor</Link>
            </Box>
            <Grid container spacing={2} p='20px'>
                <QuestionList questions={questions} />
            </Grid>
        </Box>
    )
}

export default SoruCevap