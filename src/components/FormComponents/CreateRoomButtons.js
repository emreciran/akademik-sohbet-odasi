import { Box } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const CreateRoomButtons = ({ createRoom, isEdit, closeFlyout }) => {
    const navigate = useNavigate();

    return (
        <Box marginTop="20px">
            <button
                type='submit'
                onClick={createRoom}
                className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
                {isEdit ? "Odayı Güncelle" : "Oda Oluştur"}
            </button>
            <button type='button' className="hover:shadow-form ml-2 rounded-md bg-[#f25244] py-3 px-8 text-center text-base font-semibold text-white outline-none" onClick={() => (isEdit ? closeFlyout() : navigate(-1))}>İptal</button>

        </Box>
    )
}

export default CreateRoomButtons