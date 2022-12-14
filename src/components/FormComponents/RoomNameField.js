import { Box } from '@mui/material'
import React from 'react'

const RoomNameField = ({ label, placeholder, value, onChange }) => {
    return (
        <Box>
            <label
                      class="mb-3 block text-base font-medium"
                    >
                      {label}
            </label>
            <input
                type="text"
                name="roomName"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                class="w-full rounded-md border border-[#a8a4f7] transition-all bg-transparent py-3 px-6 text-base font-medium outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
        </Box>
    )
}

export default RoomNameField