import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
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
        <Header title='Projelerim' />
        {projects?.map((project) => (
            <>
                <h3>Proje Adı: {project.project_Name}</h3>
                <p>Proje Detayı: {project.project_Details}</p>
            </>
        ))}
    </div>
  )
}

export default ProfileProjectList