import { Satellite } from '@mui/icons-material'
import { getDocs, query, where } from 'firebase/firestore'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { usersRef } from '../utils/firebaseConfig'

const useFetchUsers = () => {
    const [users, setUsers] = useState([])
    const {firebaseUserInfo} = useSelector(state => state.auth)

    useEffect(() => {
        if (firebaseUserInfo.uid){
            const getUsers = async () => {
                const firestoreQuery = query(usersRef, where("uid", "!=", firebaseUserInfo.uid))
                const data = await getDocs(firestoreQuery)
                const firebaseUsers = []
                data?.forEach((user) => {
                    const userData = user.data()
                    firebaseUsers.push({
                        label: userData.username,
                        value: userData.uid
                    })
                })
                setUsers(firebaseUsers)
            } 

            getUsers()
        }
    }, [firebaseUserInfo.uid])

    return [users]

}

export default useFetchUsers