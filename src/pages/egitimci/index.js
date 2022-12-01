import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/auth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const Egitimci = () => {
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      const userDetails = await axiosPrivate.get('/user/getuser')
      dispatch(setUser(userDetails.data))
    }

    getData()
  }, [])

  return (
    <div className='max-md:pl-20'>Egitimci</div>
  )
}

export default Egitimci