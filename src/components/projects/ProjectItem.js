import { Box, Grid, useTheme, Paper } from '@mui/material';
import React, {useState, useEffect} from 'react'
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { tokens } from '../../theme';

const ProjectItem = ({ project }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    var slug = project.project_Name.toLowerCase().replace(/[^\w-]+/g, '-');
    const axiosPrivate = useAxiosPrivate()

    const [users, setUsers] = useState()
    const [userLength, setUserLength] = useState()

    const GetUserByProject = async () => {
        const users = await axiosPrivate.get(`/projects/project/${project?.project_ID}`)
        setUserLength(users.data.length)
        setUsers(users.data.slice(0, 2))
    }

    useEffect(() => {
        GetUserByProject()
    }, [])

  return (
    <Link to={`/projects/${project.project_ID}/${slug}`}> 
    <Box className='min-h-40' border={`1px solid ${colors.primary[400]}`} borderRadius="12px" padding="20px" boxShadow="0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)">
    <div class="flex w-full items-center justify-between border-b pb-3">
        <Grid container>
        
                {
                  users?.map((user) => (
                    <Grid item xs={12} md={4} key={user?.user_ID}>
                      <Link to={`/${user?.username}`}><Avatar color={theme.palette.mode === "dark" ? '#555' : '#999'} className='rounded-full cursor-pointer' name={`${user?.username}`} size="32" /></Link>
                      <Link className={`text-xl font-bold ml-3`} to={`/${user?.username}`}>{user?.username}</Link>
                    </Grid>
                  ))
                } 
            {userLength > 2 ? <Paper className='p-2'>+ {userLength - 2}</Paper> : ''}
        </Grid>
        
    </div>

    <div class="mt-4 mb-6">
        <div class="mb-3 text-xl font-bold">{project.project_Name}</div>
    </div>
    <div>
        <div class="flex items-center justify-between text-slate-500">
            <div class="flex space-x-4 md:space-x-8">
                <div class="flex cursor-pointer items-center transition hover:text-slate-600">
                    <svg xmlns="http://www.w3.org/2000/svg" class="mr-1.5 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    <span>{project?.vote}</span>
                </div>
            </div>
        </div>
    </div>
</Box>
</Link>
  )
}

export default ProjectItem