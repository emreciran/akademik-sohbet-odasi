import React, {useEffect, useState} from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../store/auth';

const Home = () => {

  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getData = async () => {
      const userDetails = await axiosPrivate.get('/user/getuser')
      dispatch(setUser(userDetails.data))
    }

    getData()
  }, [])

  const {userDetails} = useSelector(state => state.auth)
  return (
    <div className='max-md:pl-20'>
      Welcome home, {userDetails?.name + " " + userDetails?.surname}
      <br />
      Your role: {userDetails?.role}
      <br />
      Your email: {userDetails?.email}
      <br />
      Your username: {userDetails?.username}
      <br />
      CreatedDate: {userDetails?.createdDate}
    </div>
  )
}

export default Home