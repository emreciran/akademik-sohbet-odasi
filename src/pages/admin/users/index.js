import React, { useState, useEffect } from 'react'
import UsersTable from '../../../components/admin/UsersTable';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'

const Users = () => {
  const axiosPrivate = useAxiosPrivate();
  const [users, setUsers] = useState()

  const getUsers = async () => {
    const usersData = await axiosPrivate.get('/user/GetAllUsers')
    setUsers(usersData.data)
  }

  useEffect(() => {
    getUsers()
  }, [])

  return(
    <UsersTable users={users} />
  )
}


export default Users