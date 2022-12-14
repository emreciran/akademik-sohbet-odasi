import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

const RoomUserField = ({ 
    label,
    options,
    onChange,
    value,
 }) => {
  return (
    <Box className='mt-4'>
        <label className="mb-3 block text-base font-medium">
            {label}
        </label>

            <select value={value || "DEFAULT"} onChange={onChange} id="users" className="bg-transparent border focus:shadow-md border-[#a8a4f7] transition-all text-sm rounded-md focus:border-[#6A64F1] block w-full p-2.5">
              <option value="DEFAULT" hidden disabled>Kişi Seçiniz</option>
              {options.map((option) => (
                <option key={option.value} className='text-gray-900' value={option.value}>{option.label}</option>
              ))}
            </select>

    </Box>
  )
}

export default RoomUserField