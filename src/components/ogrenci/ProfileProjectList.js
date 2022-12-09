import { Card, Typography, Skeleton, Box, Grid, useTheme } from '@mui/material';
import React, { useState, useEffect } from 'react'
import Avatar from 'react-avatar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Header from '../Header';
import { tokens } from '../../theme';

const ProfileProjectList = () => {
    const { userDetails } = useSelector(state => state.auth)
    const axiosPrivate = useAxiosPrivate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [projects, setProjects] = useState()

    const [loadingData, setLoadingData] = useState(true);


    const GetProjects = async () => {
        const projects = await axiosPrivate.get(`/projects/user/${userDetails?.user_ID}`)
        setProjects(projects.data)
        setLoadingData(false)
    }

    useEffect(() => {
        GetProjects()
    }, [])

    return (
        <Box>
            <Header title='Projeler' />

            {
                loadingData ? (
                    <Skeleton variant="rounded" animation="wave" width={300} height={80} />
                ) : projects?.map((project) => (
                    <Link to={`/projects/${project.project_ID}/${project.project_Name.toLowerCase().replace(/[^\w-]+/g, '-')}`} key={project.project_ID}>
                        <Card sx={{ minWidth: 275, backgroundColor: 'transparent' }} className="pt-4 pb-4 pl-8 pr-8 mb-2 text-center" display='flex' flexDirection='column'>
                            <Typography variant='h3' marginBottom='1rem'>Proje Adı: {project.project_Name}</Typography>
                        </Card>
                    </Link>
                ))
            }

        </Box>
    )
}

export default ProfileProjectList