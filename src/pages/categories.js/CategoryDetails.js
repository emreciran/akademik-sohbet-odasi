import { Box, Grid, Skeleton, useTheme } from '@mui/material';
import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { tokens } from '../../theme';
import { CategoryOptions } from '../../data/Categories';
import Header from '../../components/Header';
import ProjectList from '../../components/projects/ProjectList';

const CategoryDetails = () => {
    const params = useParams();
    const { name } = params;

    const category = CategoryOptions.find(x => x.slug === name);

    const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const axiosPrivate = useAxiosPrivate();

  const [projects, setProjects] = useState()
  const [loading, setLoading] = useState(true)

  const GetProjects = async () => {
    const projectsData = await axiosPrivate.get(`/projects/category/${category.value}`)
    setProjects(projectsData.data)
    setLoading(false)
}

useEffect(() => {
  GetProjects()
}, [])

const skeletonArray = Array(4).fill('');
  return (
    <Box m='20px' className='max-md:pl-20'>
            {
                loading ? (
                    <Skeleton animation="wave" variant='text' height='60px' width='300px' />
                ) : (
                    <Box display='flex' justifyContent="space-between" className='max-md:flex-col'>
                        <Header title={`${category.label} adlı kategoriye ait (${projects?.length}) proje bulundu.`} />
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
                    projects &&
                    <ProjectList projects={projects} />
                }
            </Grid>
        </Box>
  )
}

export default CategoryDetails