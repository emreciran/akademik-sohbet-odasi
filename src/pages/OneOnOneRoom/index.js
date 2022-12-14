import { Box, useTheme } from '@mui/material'
import { addDoc } from 'firebase/firestore';
import moment from 'moment/moment';
import React, { useState } from 'react'
import CreateRoomButtons from '../../components/FormComponents/CreateRoomButtons';
import RoomDateField from '../../components/FormComponents/RoomDateField';
import RoomNameField from '../../components/FormComponents/RoomNameField';
import RoomUserField from '../../components/FormComponents/RoomUserField';
import Header from '../../components/Header';
import useFetchUsers from '../../hooks/useFetchUsers';
import { roomsRef } from '../../utils/firebaseConfig';
import { useSelector } from 'react-redux'
import { generateRoomID } from '../../utils/generateRoomID';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { tokens } from '../../theme';

const OneOnOneRoom = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate()
    const [users] = useFetchUsers()

    const notify = (msg) => {
        toast.success(msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
    }

    const {firebaseUserInfo} = useSelector(state => state.auth)

    const [roomName, setRoomName] = useState("");
    const [selectedUser, setSelectedUser] = useState([]);
    const [startDate, setStartDate] = useState(moment().format('l'))

    const createRoom = async (e) => {
          e.preventDefault()
          const roomId = generateRoomID();
          await addDoc(roomsRef, {
            createdBy: firebaseUserInfo.uid,
            roomId,
            roomName,
            roomType: "1-on-1",
            invitedUsers: selectedUser,
            roomCreateDate: startDate,
            maxUsers: 1,
            status: true,
          });
          notify("Oda Oluşturuldu!")

          navigate("/myrooms");
      };
    

    return (
        <Box m='20px' className='max-md:pl-20'>
            <Box display='flex' justifyContent="space-between" className='max-md:flex-col'>
                <Header title='1e1 Oda Oluştur' />
            </Box>
            <Box class="flex items-center justify-center" marginTop="30px">
                <Box class="mx-auto w-full max-w-[800px]">
                    <form>
                        <Box>
                            <RoomNameField
                                label="Oda Adı"
                                placeholder="Oda Adı"
                                value={roomName}
                                onChange={(e) => setRoomName(e.target.value)}
                            />
                            <RoomUserField
                                label="Kişi Seçiniz"
                                options={users}
                                value={selectedUser}
                                onChange={(e) => setSelectedUser(e.target.value)}
                            />
                            <RoomDateField 
                                selected={startDate} 
                                setStartDate={setStartDate}
                            />
                            <CreateRoomButtons createRoom={createRoom} />
                        </Box>
                    </form>
                </Box>
            </Box>
        </Box>
    )
}

export default OneOnOneRoom