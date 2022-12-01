import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/auth';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();

  const getData = async () => {
    const userDetails = await axiosPrivate.get('/user/getuser')
    dispatch(setUser(userDetails.data))
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className='max-md:pl-20'>
      <Outlet />
    </div>
  )
}

export default AdminLayout