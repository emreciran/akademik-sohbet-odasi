import React, { useState } from 'react'
import { onAuthStateChanged } from "firebase/auth"
import { firebaseAuth, roomsRef } from "../../utils/firebaseConfig"
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { getDocs, query, where } from 'firebase/firestore'
import moment from 'moment'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import {generateRoomID} from "../../utils/generateRoomID"

const JoinRoom = () => {
  const {firebaseUserInfo} = useSelector(state => state.auth)
  const {userDetails} = useSelector(state => state.auth)
  const params = useParams()
  const navigate = useNavigate()
  const [isAllowed, setIsAllowed] = useState(false)
  const [userLoaded, setUserLoaded] = useState(false)

  const notify = (msg, type) => {
    toast.TYPE[`${type}`](msg, {
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
const infoNotify = (msg) => {
  toast.info(msg, {
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


  const getRoomData = async () => { 
    if(params.id && firebaseUserInfo){
      const firestoreQuery = query(roomsRef, where("roomId", "==", params.id));
      const fetchedRooms = await getDocs(firestoreQuery);
      
      if(fetchedRooms.docs.length){
        const room = fetchedRooms.docs[0].data()
        const isCreator = room.createdBy === firebaseUserInfo?.uid
        if(room.roomType === "1-on-1"){
          if(room.invitedUsers === firebaseUserInfo?.uid || isCreator){
            if(room.roomStartDate === moment().format("l")){
              setIsAllowed(true)
            } else if(moment(room.roomStartDate).isBefore(moment().format("l"))){
              notify("Süresi Bitmiş Oda!", "ERROR")
              navigate(firebaseUserInfo ? "/rooms" : "/auth/login")
            } else if(moment(room.roomStartDate).isAfter(moment().format("l"))){
              notify(`Oda ${room.roomStartDate} tarihinde başlayacak!`, "INFO")
              navigate(firebaseUserInfo ? "/rooms" : "/auth/login")
            } 
          } else navigate(firebaseUserInfo ? "/rooms" : "/auth/login")
        } else if(room.roomType === "invited-users-can-join-room"){
          const index = room.invitedUsers.findIndex(user => user === firebaseUserInfo.uid)
          if(index !== -1 || isCreator){
            if(room.roomStartDate === moment().format("l")){
              setIsAllowed(true)
            } else if(moment(room.roomStartDate).isBefore(moment().format("l"))){
              notify("Süresi Bitmiş Oda!", "ERROR")
              navigate(firebaseUserInfo ? "/rooms" : "/auth/login")
            } else if(moment(room.roomStartDate).isAfter(moment().format("l"))){
              notify(`Oda ${room.roomStartDate} tarihinde başlayacak!`, "INFO")
              navigate(firebaseUserInfo ? "/rooms" : "/auth/login")
            }
          } else{
              notify("Bu Odaya Davetli Değilsiniz!", "ERROR")
              navigate(firebaseUserInfo ? "/rooms" : "/auth/login")
          }
        } else{
          setIsAllowed(true)
        }
      }
    }
  }

  useEffect(() => {
    getRoomData()
  }, [])

  const myRoom = async (element) => {
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      parseInt(process.env.REACT_APP_ZEGOCLOUD_APP_ID),
      process.env.REACT_APP_ZEGOCLOUD_SERVER_SECRET,
      params.id,
      firebaseUserInfo?.uid ? firebaseUserInfo.uid : generateRoomID(),
      userDetails?.username ? userDetails.username : generateRoomID()
    );
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp?.joinRoom({
      container: element,
      maxUsers: 50,
      sharedLinks: [
        {
          name: "Oda link",
          url: window.location.href,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
    });
  };
  

  return isAllowed ? (
    <>
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <div
        className="myCallContainer"
        ref={myRoom}
        style={{ width: "100%", height: "100vh" }}
      ></div>
    </div>
    </>
  ) : (
    <></>
  );

}

export default JoinRoom