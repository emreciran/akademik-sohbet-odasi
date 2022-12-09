import { Box, Grid, Skeleton, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Header from '../../components/Header';
import { tokens } from '../../theme';
import ProjectList from '../../components/projects/ProjectList';
import { Link } from 'react-router-dom';

const Projects = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const axiosPrivate = useAxiosPrivate();

  const [projects, setProjects] = useState()
  const [loading, setLoading] = useState(true)


  const GetProjects = async () => {
      const projectsData = await axiosPrivate.get('/projects')
      setProjects(projectsData.data)
      setLoading(false)
  }

  useEffect(() => {
    GetProjects()
  }, [])

  const skeletonArray = Array(4).fill('');

  return (
    <Box m='20px' className='max-md:pl-20'>
            <Box display='flex' justifyContent="space-between" className='max-md:flex-col'>
                <Header title='Projeler' />
                <Link to='/yeni-proje' className="w-36 mt-2 hover:bg-[#544ede] rounded-md bg-[#6A64F1] py-2 px-8 text-center text-base font-semibold text-white outline-none">Yeni Proje</Link>
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
                    projects &&
                    <ProjectList projects={projects} />
                }
            </Grid>
        </Box>
  )
}

export default Projects