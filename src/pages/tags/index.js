import React from 'react'
import Header from '../../components/Header';
import { tokens } from '../../theme';
import { Link } from 'react-router-dom';
import { Box, Grid, Skeleton, Typography, useTheme } from '@mui/material';
import { TagOptions } from "../../data/Tags";

const TagsList = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box m='20px' className='max-md:pl-20'>
            <Box display='flex' justifyContent="space-between" className='max-md:flex-col'>
                <Header title='Soru Tagları' />
            </Box>


            <Grid container spacing={2} p='20px'>


                {

                    TagOptions?.map((tag) => (

                        <Grid item xs={12} md={3} key={tag.value}>
                            <Link to={`/tags/${tag.label.toLowerCase().replace(/[^\w-]+/g, '-')}`}>
                                <Box className='min-h-40' border={`1px solid ${colors.primary[400]}`} borderRadius="12px" padding="20px" boxShadow="0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)">
                                    <div class="border-b pb-3">
                                        <Box display='flex' alignItems='center' gap={4}>
                                            <Typography variant="h3">{tag.label}</Typography>
                                            <Box fontSize={50}>
                                                {tag.image}
                                            </Box>
                                        </Box>
                                    </div>
                                </Box>
                            </Link>
                        </Grid>

                    ))
                }
            </Grid>

        </Box>
    )
}

export default TagsList