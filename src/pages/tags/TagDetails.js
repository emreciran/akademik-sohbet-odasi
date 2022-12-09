import { Box, Grid, Skeleton, useTheme } from '@mui/material';
import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { tokens } from '../../theme';
import { TagOptions } from '../../data/Tags';
import Header from '../../components/Header';
import QuestionList from '../../components/soru-cevap/QuestionList';

const TagDetails = () => {
    const params = useParams();
    const { name } = params;

    const tag = TagOptions.find(x => x.slug === name);

    const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const axiosPrivate = useAxiosPrivate();

  const [questions, setQuestions] = useState()
  const [loading, setLoading] = useState(true)

  const GetQuestions = async () => {
    const questionsData = await axiosPrivate.get(`/questions/tag/${tag.value}`)
    setQuestions(questionsData.data)
    setLoading(false)
}

useEffect(() => {
    GetQuestions()
}, [])

    const skeletonArray = Array(4).fill('');
    return (
      <Box m='20px' className='max-md:pl-20'>
              {
                  loading ? (
                      <Skeleton animation="wave" variant='text' height='60px' width='300px' />
                  ) : (
                      <Box display='flex' justifyContent="space-between" className='max-md:flex-col'>
                          <Header title={`#${tag.label} adlı taga ait (${questions?.length}) soru bulundu.`} />
                      </Box>
                  )
              }
  
  
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

export default TagDetails