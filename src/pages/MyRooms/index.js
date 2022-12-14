import { Box, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid'
import React, { useState, useEffect } from 'react'
import RoomsTable from '../../components/rooms/RoomsTable';
import { tokens } from '../../theme';
import { getDocs, query, where } from "firebase/firestore";
import { roomsRef } from "../../utils/firebaseConfig";
import { useSelector } from 'react-redux';
import EditRoom from '../../components/rooms/EditRoom';
import Header from '../../components/Header';

const MyRooms = () => {
    const [rooms, setRooms] = useState([]) 
    const { firebaseUserInfo } = useSelector(state => state.auth)
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [showEditRoom, setShowEditRoom] = useState(false);
    const [editRoom, setEditRoom] = useState();

    const getMyRooms = async () => {
        const firestoreQuery = query(roomsRef, where("createdBy", "==", firebaseUserInfo?.uid))
        const fetchedRooms = await getDocs(firestoreQuery)
        if(fetchedRooms.docs.length) {
            const myRooms = [];
            fetchedRooms.forEach((room) => {
                myRooms.push({
                    docId: room.id,
                    ...room.data()
                })
            })
            setRooms(myRooms)
        }
    }

    const openEditRoom = (room) => {
        setShowEditRoom(true);
        setEditRoom(room);
      };
    
      const closeEditRoom = (dataChanged = false) => {
        setShowEditRoom(false);
        setEditRoom(undefined);
        if (dataChanged) getMyRooms();
    };

    useEffect(() => {
        getMyRooms()
    }, [firebaseUserInfo])

  return (
    <Box m='20px' className='max-md:pl-20'>
        <Header title="Odalarım" />
        <RoomsTable rooms={rooms} openEditRoom={openEditRoom} myRooms />
        {showEditRoom && (
            <EditRoom room={editRoom.row} close={closeEditRoom} />
        )}
    </Box>
  )
}

export default MyRooms