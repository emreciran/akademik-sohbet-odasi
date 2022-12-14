import { Box, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid'
import React, { useState, useEffect } from 'react'
import RoomsTable from '../../components/rooms/RoomsTable';
import { tokens } from '../../theme';
import { getDocs, query, where } from "firebase/firestore";
import { roomsRef } from "../../utils/firebaseConfig";
import { useSelector } from 'react-redux';
import Header from '../../components/Header';

const Rooms = () => {
    const [rooms, setRooms] = useState([]) 
    const { firebaseUserInfo } = useSelector(state => state.auth)
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    useEffect(() => {
            const getUserRooms = async () => {
                const firestoreQuery = query(roomsRef)
                const fetchedRooms = await getDocs(firestoreQuery)
                if(fetchedRooms.docs.length){
                    const myRooms = []
                    fetchedRooms.forEach((room) => {
                        const data = room.data()
                        if(data.createdBy === firebaseUserInfo.uid) myRooms.push(room.data())
                        else if(data.roomType === "anyone-can-join-room") myRooms.push(room.data())
                        else if(data.roomType === "invited-users-can-join-room"){
                            const index = data.invitedUsers.findIndex(user => user === firebaseUserInfo.uid)
                            if (index !== -1) myRooms.push(room.data())
                        }
                    })
                    setRooms(myRooms)
                }           
            }

            if(firebaseUserInfo) getUserRooms()
    }, [firebaseUserInfo])

  return (
    <Box m='20px' className='max-md:pl-20'>
        <Header title="Odalar" />
        <RoomsTable rooms={rooms} />
    </Box>
  )
}

export default Rooms