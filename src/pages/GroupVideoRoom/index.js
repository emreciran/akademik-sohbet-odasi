import { Box, FormControlLabel, Switch, useTheme } from '@mui/material'
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
import RoomMaximumUsersField from '../../components/FormComponents/RoomMaximumUsersField';
import { MultiSelect } from 'react-multi-select-component';
import { tokens } from '../../theme';

const GroupVideoRoom = () => {
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

    const [size, setSize] = useState(1)
    const [anyoneCanJoin, setAnyoneCanJoin] = useState(false)

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
            roomType: anyoneCanJoin ? "anyone-can-join-room" : "invited-users-can-join-room",
            invitedUsers: anyoneCanJoin ? [] : selectedUser.map((user) => user.value),
            roomCreateDate: startDate,
            maxUsers: anyoneCanJoin ? size : selectedUser.length,
            status: true,
          });
          notify("Oda Oluşturuldu!")

          navigate("/myrooms");
      };
    

    return (
        <Box m='20px' className='max-md:pl-20'>
            <Box display='flex' justifyContent="space-between" className='max-md:flex-col'>
                <Header title='Grup Video Odası Oluştur' />
            </Box>
            <Box class="flex items-center justify-center" marginTop="30px">
                <Box class="mx-auto w-full max-w-[800px]">
                    <form>
                        <Box>
                            <Box marginBottom="10px">
                                <FormControlLabel control={<Switch checked={anyoneCanJoin} onChange={(e) => setAnyoneCanJoin(e.target.checked)} color='secondary' defaultChecked />} label={anyoneCanJoin ? "Herkes katılabilir." : "Davet ettiğiniz kişiler katılabilir."} />
                            </Box>
                            <RoomNameField
                                label="Oda Adı"
                                placeholder="Oda Adı"
                                value={roomName}
                                onChange={(e) => setRoomName(e.target.value)}
                            />
                            {anyoneCanJoin ? (
                                <RoomMaximumUsersField label="Odaya Katılabilecek Maksimum Kişi Sayısı" value={size} setSize={setSize} />
                            ) : (
                                <Box className='mt-4'>
                                    <label className="mb-3 block text-base font-medium">
                                        Davet Et
                                    </label>
                                    <MultiSelect
                                    options={users}
                                    value={selectedUser}
                                    onChange={setSelectedUser}
                                    labelledBy="Kullanıcı Seçiniz"
                                    />
                                </Box>
                            )}
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

export default GroupVideoRoom