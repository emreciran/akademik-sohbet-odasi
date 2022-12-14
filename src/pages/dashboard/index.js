import { Box, Grid, Typography, useTheme } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/Header'
import { tokens } from '../../theme'
import NewRoomImage from "../../assets/newroom.png"
import MyRoomsImage from "../../assets/myrooms.png"
import RoomsImage from "../../assets/rooms.png"

const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box m='20px' className='max-md:pl-20' >
            <Box display='flex' justifyContent="space-between" className='max-md:flex-col'>
                <Header title='Dashboard' />
            </Box>


            <Grid container spacing={2} p='20px'>
                <Grid item xs={12} md={4}>
                    <Link to="/create">
                        <Box className='min-h-50' border={`1px solid ${colors.primary[400]}`} borderRadius="12px" padding="20px" boxShadow="0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)">
                            <div>
                                <Box display='flex' flexDirection='column' textAlign='center' alignItems='center' gap={4}>
                                    <img src={NewRoomImage} width='80px' />
                                    <Typography variant="h3">Yeni Oda Kur</Typography>
                                    <Typography variant='h6' color={`${colors.grey[300]}`}>Yeni oda kur ve kullanıcıları davet et.</Typography>
                                </Box>
                            </div>
                        </Box>
                    </Link>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Link to="/myrooms">
                        <Box className='min-h-50' border={`1px solid ${colors.primary[400]}`} borderRadius="12px" padding="20px" boxShadow="0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)">
                            <div >
                                <Box display='flex' flexDirection='column' textAlign='center' alignItems='center' gap={4}>
                                    <img src={MyRoomsImage} width='80px' />
                                    <Typography variant="h3">Kurduğum Odalar</Typography>
                                    <Typography variant='h6' color={`${colors.grey[300]}`}>Kurduğun odaları kontrol et.</Typography>
                                </Box>
                            </div>
                        </Box>
                    </Link>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Link to="/rooms">
                        <Box className='min-h-50' border={`1px solid ${colors.primary[400]}`} borderRadius="12px" padding="20px" boxShadow="0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)">
                            <div >
                                <Box display='flex' flexDirection='column' textAlign='center' alignItems='center' gap={4}>
                                    <img src={RoomsImage} width='80px' />
                                    <Typography variant="h3">Odalar</Typography>
                                    <Typography variant='h6' color={`${colors.grey[300]}`}>Odaları görüntüle ve katıl.</Typography>
                                </Box>
                            </div>
                        </Box>
                    </Link>
                </Grid>
            </Grid>

        </Box>
    )
}

export default Dashboard