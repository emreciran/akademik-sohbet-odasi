import { Box, Typography, useTheme, Tab, Tabs } from '@mui/material'
import React, {useEffect, useState} from 'react'
import Avatar from 'react-avatar';
import { tokens } from '../theme';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { setUser } from '../store/auth';
import { useDispatch, useSelector } from 'react-redux';
import ProfileProjectList from '../components/ogrenci/ProfileProjectList';
import Header from '../components/Header';
import ProfileQuestionList from '../components/ogrenci/ProfileQuestionList';

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

const Profile = () => {
    const { userDetails } = useSelector(state => state.auth)
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const axiosPrivate = useAxiosPrivate();
    const dispatch = useDispatch();
    const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
    const getData = async () => {
      const userDetails = await axiosPrivate.get('/user/getuser')
      dispatch(setUser(userDetails.data))
    }

    useEffect(() => {
        getData()
      }, [])
  return (
    <Box m='20px' className='max-md:pl-20'>
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
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs textColor="secondary" indicatorColor="secondary" value={value} onChange={handleChange} aria-label="secondary tabs example">
          <Tab label="Bilgilerim" {...a11yProps(0)} />
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
        {userDetails?.role !== "Admin" ? <ProfileQuestionList /> : ""}
      </TabPanel> : ""}
      {userDetails?.role === "Ogrenci" ? <TabPanel value={value} index={2}>
          {userDetails?.role === "Ogrenci" ? <ProfileProjectList /> : ""}
        </TabPanel> : ""}
        
    </Box>
    </Box>
  )
}

export default Profile