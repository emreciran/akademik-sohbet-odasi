import { Box, Divider, Drawer, FormControlLabel, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Switch, Typography } from '@mui/material';
import React, { useState } from 'react'
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import RoomNameField from "../../components/FormComponents/RoomNameField"
import RoomMaximumUsersField from "../../components/FormComponents/RoomMaximumUsersField"
import RoomUserField from "../../components/FormComponents/RoomUserField"
import RoomDateField from "../../components/FormComponents/RoomDateField"
import { useEffect } from 'react';
import moment from 'moment';
import useFetchUsers from "../../hooks/useFetchUsers"
import CreateRoomButtons from '../FormComponents/CreateRoomButtons';
import { doc, updateDoc } from "firebase/firestore";
import { firebaseDB } from '../../utils/firebaseConfig';
import { toast } from 'react-toastify';

const EditRoom = ({ room, close }) => {
    const [state, setState] = useState({ right: false });

    const [users] = useFetchUsers();
    const [roomName, setRoomName] = useState(room.roomName);
    const [roomType] = useState(room.roomType);
    const [selectedUser, setSelectedUser] = useState([]);
    const [startDate, setStartDate] = useState(moment(room.roomCreateDate));
    const [size, setSize] = useState(room.maxUsers);
    const [status, setStatus] = useState(room.status);

    const notify = (msg) => {
        toast.success(msg, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
    }

    useEffect(() => {
        if (users) {
            const foundUsers = []
            room.invitedUsers?.forEach((user) => {
                const findUser = users.find(tempUser => tempUser.uid === user)
                if (findUser) foundUsers.push(findUser)
            })
            setSelectedUser(foundUsers)
        }
    }, [users, room])

    const toggleDrawer = (anchor, open) => (event) => {
        setState({ [anchor]: open });
        close(true)
    };


    const handleEditRoom = async (e) => {
        e.preventDefault()
        const editedRoom = {
            ...room,
            roomName,
            roomType,
            invitedUsers: selectedUser.map((user) => user.uid),
            maxUsers: size,
            roomCreateDate: startDate.format("l"),
            status
        }

        delete editedRoom.docId
        const docRef = doc(firebaseDB, "rooms", room.docId)
        await updateDoc(docRef, editedRoom)

        close(true)
        notify("Oda Güncellendi!")
    }

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 450 }}
            role="presentation"
            width="100%"
        >  
            <Box class="mx-auto w-full">
                <Box padding="1rem" display='flex' justifyContent='space-between' alignItems="center">
                    <Typography variant='h3' fontWeight={700}>{room?.roomName}</Typography>
                    <Typography onClick={toggleDrawer("right", false)} fontSize="18px" fontWeight={700} className='cursor-pointer'>X</Typography>
                </Box>
                <Divider />
                <form className='w-full'>
                    <Box marginTop="30px" width="100%">
                        <List>
                            <ListItem className='w-full'>
                                <RoomNameField
                                    label="Oda Adı"
                                    placeholder="Oda Adı"
                                    value={roomName}
                                    onChange={(e) => setRoomName(e.target.value)}
                                />
                            </ListItem>
                            <ListItem>
                                {roomType === "anyone-can-join-room" ? (
                                    <RoomMaximumUsersField label="Odaya Katılabilecek Maksimum Kişi Sayısı" value={size} setSize={setSize} />
                                ) : (
                                    <RoomUserField
                                        label="Kişi Seçiniz"
                                        options={users}
                                        value={selectedUser}
                                        onChange={(e) => setSelectedUser(e.target.value)}
                                    />
                                )}
                            </ListItem>
                            <ListItem>
                                <RoomDateField selected={startDate} setStartDate={setStartDate} />
                            </ListItem>
                            <ListItem>
                                <Box marginBottom="10px">
                                    <FormControlLabel control={<Switch checked={status} onChange={(e) => setStatus(e.target.checked)} color='secondary' />} label={status ? "Aktif Oda" : "Pasif Oda"} />
                                </Box>
                            </ListItem>
                            <ListItem>
                                <CreateRoomButtons isEdit createRoom={handleEditRoom} closeFlyout={close}  />
                            </ListItem>
                        </List>
                    </Box>

                </form>
            </Box>
        </Box>
    );

    return (
        <Box width="100%">
            <Drawer
                anchor="right"
                open={"right"}
                onClose={toggleDrawer("right", false)}
            >
                {list("right")}
            </Drawer>
        </Box>
    )
}

export default EditRoom