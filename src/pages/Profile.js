import { Box, Typography, useTheme } from '@mui/material'
import React, {useEffect} from 'react'
import Avatar from 'react-avatar';
import { tokens } from '../theme';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { setUser } from '../store/auth';
import { useDispatch, useSelector } from 'react-redux';
import ProfileProjectList from '../components/ogrenci/ProfileProjectList';
import Header from '../components/Header';

const Profile = () => {
    const { userDetails } = useSelector(state => state.auth)
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const axiosPrivate = useAxiosPrivate();
    const dispatch = useDispatch();
  
    const getData = async () => {
      const userDetails = await axiosPrivate.get('/user/getuser')
      dispatch(setUser(userDetails.data))
    }

    useEffect(() => {
        getData()
      }, [])
  return (
    <Box m='20px'>
           <Header title='Profilim' />
    <Box display='flex' flexDirection='column' alignItems='center'>
        
        <Box display='flex' flexDirection='column' alignItems='center'>
            <Avatar color={theme.palette.mode === "dark" ? '#555' : '#999'} className='rounded-full' name={`${userDetails?.name} ${userDetails?.surname}`} size="80" />
            <Typography
                variant="h2"
                color={colors.grey[100]}
                fontWeight="bold"
                sx={{ m: "10px 0 0 0" }}
              >
                {`${userDetails?.name} ${userDetails?.surname}`}
              </Typography>
              <Typography variant="h5" color={colors.greenAccent[500]}>
                {userDetails?.role}
              </Typography>
              <Box
                width="70%"
                m="10px auto"
                p="5px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                backgroundColor={
                    userDetails?.status === true
                    ? colors.greenAccent[600]
                    : colors.redAccent[600]
                }
                borderRadius="4px"
              >
                <Typography color={colors.grey[100]}>
                  {userDetails?.status === true ? 'Aktif': 'Pasif'}
                </Typography>
              </Box>
        </Box>
        <Box>
            <Box display='grid' gridTemplateColumns='repeat(2, 1fr)' marginBottom={1}>
                <Box display='flex'>
                    <Typography variant='h5'>AD:</Typography>
                    <Typography variant='h5' marginLeft={1}>{userDetails?.name}</Typography>
                </Box>
                <Box display='flex'>
                    <Typography variant='h5'>SOYAD:</Typography>
                    <Typography variant='h5' marginLeft={1}>{userDetails?.surname}</Typography>
                </Box>
            </Box>
            <Box display='flex' marginBottom={1}>
                <Typography variant='h5'>EMAIL:</Typography>
                <Typography variant='h5' marginLeft={1}>{userDetails?.email}</Typography>
            </Box>
            <Box display='flex' marginBottom={1}>
                <Typography variant='h5'>USERNAME:</Typography>
                <Typography variant='h5' marginLeft={1}>{userDetails?.username}</Typography>
            </Box>
        </Box>
        {userDetails?.role === "Ogrenci" ? <ProfileProjectList /> : ""}
    </Box>
    </Box>
  )
}

export default Profile