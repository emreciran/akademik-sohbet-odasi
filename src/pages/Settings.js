import React, { useEffect, useState } from 'react'
import { tokens } from '../theme';
import { Box, Typography, useTheme } from '@mui/material'
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { setUser } from '../store/auth';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const { userDetails } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const getData = async () => {
    const user = await axiosPrivate.get('/user/getuser')
    setName(user.data.name)
    setSurname(user.data.surname)
    setEmail(user.data.email)
    setUsername(user.data.username)
  }

  const data = {
    Name: name,
    Surname: surname,
    Email: email,
    Username: username,
    NewPassword: newPassword,
    ConfirmPassword: confirmPassword
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedUser = await axiosPrivate.post(`/user/UpdateUserProfile`, data);
    navigate("/profile")
  }

  useEffect(() => {
    getData()
  }, [])
  return (
    <Box m='20px' className='max-md:pl-20'>
      <Header title='Ayarlar' />
      <Box>
        <div class="flex items-center justify-center p-12">
          <div class="mx-auto w-full max-w-[550px]">
            <form onSubmit={handleSubmit}>
              <div class="-mx-3 flex flex-wrap">
                <div class="w-full px-3 sm:w-1/2">
                  <div class="mb-5">
                    <label
                      for="name"
                      class="mb-3 block text-base font-medium"
                    >
                      Ad
                    </label>
                    <input
                      type="text"
                      name="Name"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ad"
                      class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>
                <div class="w-full px-3 sm:w-1/2">
                  <div class="mb-5">
                    <label
                      for="surname"
                      class="mb-3 block text-base font-medium"
                    >
                      Soyad
                    </label>
                    <input
                      type="text"
                      name="Surname"
                      id="surname"
                      value={surname}
                      onChange={(e) => setSurname(e.target.value)}
                      placeholder="Soyad"
                      class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>

              </div>
              <div class="-mx-3 flex flex-wrap">
                <div class="w-full px-3 sm:w-1/2">
                  <div class="mb-5">
                    <label
                      for="email"
                      class="mb-3 block text-base font-medium"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      name="Email"
                      id="email"
                      disabled
                      value={email}
                      placeholder="Email"
                      class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>
                <div class="w-full px-3 sm:w-1/2">
                  <div class="mb-5">
                    <label
                      for="username"
                      class="mb-3 block text-base font-medium"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      name="Username"
                      id="username"
                      disabled
                      value={username}
                      placeholder="Username"
                      class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>
              </div>
              <div class="mb-5">
                <label
                  for="newpassword"
                  class="mb-3 block text-base font-medium"
                >
                  Yeni Şifre
                </label>
                <input
                  type="password"
                  name="Email"
                  id="newpassword"
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Yeni Şifre"
                  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              <div class="mb-5">
                <label
                  for="confirmpassword"
                  class="mb-3 block text-base font-medium"
                >
                  Yeni Şifre Tekrar
                </label>
                <input
                  type="password"
                  name="Email"
                  id="confirmpassword"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Yeni Şifre Tekrar"
                  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              <div className='flex flex-col'>
                <button
                  type='submit'
                  className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                >
                  Güncelle
                </button>
                <button type='button' className='mt-4' onClick={() => navigate(-1)}>Geri Dön</button>
              </div>
            </form>
          </div>
        </div>
      </Box>
    </Box>
  )
}

export default Settings