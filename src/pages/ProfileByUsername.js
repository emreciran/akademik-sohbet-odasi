import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { Box, Typography, useTheme, Tab, Tabs } from '@mui/material'
import Header from '../components/Header'
import ProfileProjectList from '../components/ogrenci/ProfileProjectList'
import { tokens } from '../theme'
import Avatar from 'react-avatar'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const ProfileByUsername = () => {
    const params = useParams();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const username = params.username;
    const axiosPrivate = useAxiosPrivate();

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const [userDetails, setUserDetails] = useState()
    const getData = async () => {
        const user = await axiosPrivate.get(`/user/user/${username}`)
        setUserDetails(user.data)
    } 

      useEffect(() => {
        getData()
      }, [])
  return (
    <Box m='20px' className='max-md:pl-20'>
           <Header title='Kullanıcı Detay' />
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
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs textColor="secondary" indicatorColor="secondary" value={value} onChange={handleChange} aria-label="secondary tabs example">
          <Tab label="Kullanıcı Bilgileri" {...a11yProps(0)} />
          {userDetails?.role !== "Admin" ? <Tab label="Sorular" {...a11yProps(1)} /> : ""}
          {userDetails?.role === "Ogrenci" ? <Tab label="Projeler" {...a11yProps(2)} /> : ""}
        </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
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
        </TabPanel>
        {userDetails?.role !== "Admin" ? <TabPanel value={value} index={1}>
          Sorular
      </TabPanel> : ""}
        {userDetails?.role === "Ogrenci" ? <TabPanel value={value} index={2}>
          {userDetails?.role === "Ogrenci" ? <ProfileProjectList /> : ""}
        </TabPanel> : ""}
       
    </Box>
    </Box>
  )
}

export default ProfileByUsername