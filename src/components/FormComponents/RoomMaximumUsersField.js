import { Box } from '@mui/material'
import React from 'react'

const RoomMaximumUsersField = ({ label, value, setSize }) => {
  return (
    <Box className='mt-4'>
        <label className="mb-3 block text-base font-medium">
            {label}
        </label>
        <input 
        type="number"
        value={value}
        min={1} max={50} 
        className="bg-transparent border focus:shadow-md border-[#a8a4f7] transition-all outline-none text-sm rounded-md focus:border-[#6A64F1] block w-full p-2.5" placeholder="Kişi Saysı Seçin" required 
        onChange={(e) => {{
            if(!e.target.value.length || parseInt(e.target.value) === 0) setSize(1)
            else if(parseInt(e.target.value) > 50) setSize(50)
            else setSize(parseInt(e.target.value))
        }}}
        />
    </Box>
  )
}

export default RoomMaximumUsersField