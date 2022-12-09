import React from 'react'
import { Box, useTheme } from '@mui/material'
import Avatar from 'react-avatar';
import { tokens } from '../../theme';
import { Link } from 'react-router-dom';

const QuestionItem = ({ question }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    var slug = question.title.toLowerCase().replace(/[^\w-]+/g, '-');


    return (

    <Link to={`/soru/${question.question_ID}/${slug}`}>  <Box border={`1px solid ${colors.primary[400]}`} borderRadius="12px" padding="20px" boxShadow="0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)">
    <div class="flex w-full items-center justify-between border-b pb-3">
        <div class="flex items-center space-x-3">
            <Link to={`/${question?.username}`}><Avatar color={theme.palette.mode === "dark" ? '#555' : '#999'} className='rounded-full cursor-pointer' name={`${question?.username}`} size="32" /></Link>
            <Link to={`/${question?.username}`} class="text-lg font-bold">{question?.username}</Link>
        </div>
    </div>

    <div class="mt-4 mb-6">
        <div class="mb-3 text-xl font-bold">{question.title}</div>
    </div>

    <div>
        <div class="flex items-center justify-between text-slate-500">
            <div class="flex space-x-4 md:space-x-8">
                <div class="flex cursor-pointer items-center transition hover:text-slate-600">
                    <svg xmlns="http://www.w3.org/2000/svg" class="mr-1.5 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                    <span>{question?.view}</span>
                </div>
                <div class="flex cursor-pointer items-center transition hover:text-slate-600">
                    <svg xmlns="http://www.w3.org/2000/svg" class="mr-1.5 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    <span>{question?.vote}</span>
                </div>
            </div>
        </div>
    </div>
</Box>
</Link>

    )
}

export default QuestionItem