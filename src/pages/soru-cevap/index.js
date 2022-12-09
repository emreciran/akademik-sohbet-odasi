import React, { useEffect, useState } from 'react'
import Header from '../../components/Header';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { tokens } from '../../theme';
import { Box, Typography, useTheme, Grid, Skeleton } from '@mui/material'
import QuestionList from '../../components/soru-cevap/QuestionList';
import { Link } from 'react-router-dom';

const SoruCevap = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const axiosPrivate = useAxiosPrivate();

    const [questions, setQuestions] = useState()
    const [loading, setLoading] = useState(true)


    const GetQuestions = async () => {
        const questionsData = await axiosPrivate.get('/questions')
        setQuestions(questionsData.data)
        setLoading(false)
    }


    useEffect(() => {
        GetQuestions()
    }, [])

    const skeletonArray = Array(4).fill('');
    return (
        <Box m='20px' className='max-md:pl-20'>
            <Box display='flex' justifyContent="space-between" className='max-md:flex-col'>
                <Header title='Son Sorular' />
                <Link to='/soru-sor' className="w-32 mt-2 hover:bg-[#544ede] rounded-md bg-[#6A64F1] py-2 px-8 text-center text-base font-semibold text-white outline-none">Soru Sor</Link>
            </Box>


            <Grid container spacing={2} p='20px'>
                {
                    loading &&
                    skeletonArray.map((item, i) => (
                        <Box className='w-2/4 max-md:w-full' key={i} sx={{ my: 5, padding: '10px' }}>
                            <Skeleton variant="rounded" animation="wave" width='100%' height={150} />
                        </Box>
                    ))
                }


                {
                    questions &&
                    <QuestionList questions={questions} />
                }
            </Grid>
        </Box>



    )
}

export default SoruCevap