import React from 'react'
import { Box, Grid, Typography, useTheme } from '@mui/material'
import { Link } from 'react-router-dom'
import Header from '../../components/Header'
import { tokens } from '../../theme'
import CreateRoomImage1 from "../../assets/1e1oda.png"
import CreateRoomImage2 from "../../assets/grupoda.png"
import { useSelector } from 'react-redux';

const CreateRoom = () => {
    const { userDetails } = useSelector(state => state.auth)
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box m='20px' className='max-md:pl-20' >
            <Box display='flex' justifyContent="space-between" className='max-md:flex-col'>
                <Header title='Oda Oluştur' />
            </Box>


            <Grid container spacing={2} p='20px'>
                <Grid item xs={12} md={6}>
                    <Link to="/create-1on1-room">
                        <Box className='min-h-50' border={`1px solid ${colors.primary[400]}`} borderRadius="12px" padding="20px" boxShadow="0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)">
                            <div>
                                <Box display='flex' flexDirection='column' textAlign='center' alignItems='center' gap={4}>
                                    <img src={CreateRoomImage1} width='80px' />
                                    <Typography variant="h3">1 e 1 Oda Oluştur</Typography>
                                    <Typography variant='h6' color={`${colors.grey[300]}`}>Kişisel 1 e 1 oda oluştur.</Typography>
                                </Box>
                            </div>
                        </Box>
                    </Link>
                </Grid>
                {
                    userDetails?.role.includes("Egitimci") ? (
                        <Grid item xs={12} md={6}>
                            <Link to="/create-group-room">
                                <Box className='min-h-50' border={`1px solid ${colors.primary[400]}`} borderRadius="12px" padding="20px" boxShadow="0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)">
                                    <div >
                                        <Box display='flex' flexDirection='column' textAlign='center' alignItems='center' gap={4}>
                                            <img src={CreateRoomImage2} width='80px' />
                                            <Typography variant="h3">Grup Video Odası Oluştur</Typography>
                                            <Typography variant='h6' color={`${colors.grey[300]}`}>Grup video odası oluştur ve kullanıcıları davet et.</Typography>
                                        </Box>
                                    </div>
                                </Box>
                            </Link>
                        </Grid>
                    ) : ''
                }
            </Grid>

        </Box>
    )
}

export default CreateRoom