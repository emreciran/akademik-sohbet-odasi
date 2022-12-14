import { Box, TextField } from '@mui/material'
import React from 'react'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import moment from 'moment';

const RoomDateField = ({ selected, setStartDate }) => {
  const currDay = moment().format('l');

  return (
    <Box className='mt-8'>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DesktopDatePicker
          label="Tarih Seçiniz"
          inputFormat="DD-MM-YYYY"
          type="date"
          minDate={currDay}
          value={selected}
          onChange={setStartDate}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </Box>
  )
}

export default RoomDateField