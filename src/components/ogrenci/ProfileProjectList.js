import { Card, Typography } from '@mui/material';
import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Header from '../Header';

const ProfileProjectList = () => {
    const { userDetails } = useSelector(state => state.auth)
    const axiosPrivate = useAxiosPrivate();
    const [projects, setProjects] = useState()

    const GetProjects = async () => {
        const projects = await axiosPrivate.get(`/projects/user/${userDetails?.user_ID}`)
        setProjects(projects.data)
    }

    useEffect(() => {
        GetProjects()
    }, [])

  return (
    <div>
        <Header title='Projeler' />
        {projects?.map((project) => (
            <Link to={`/proje/${project.project_ID}/${project.project_Name.toLowerCase().replace(/[^\w-]+/g, '-')}`} key={project.project_ID}>
                <Card sx={{ minWidth: 275, backgroundColor: 'transparent' }} className="pt-4 pb-4 pl-8 pr-8 mb-2 text-center" display='flex' flexDirection='column'>
                    <Typography variant='h3' marginBottom='1rem'>Proje Adı: {project.project_Name}</Typography>
                    <Typography>Proje Detayı: {project.project_Details}</Typography>
                </Card>
            </Link>
        ))}
    </div>
  )
}

export default ProfileProjectList