import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import axios from '../../api/axios';
import { tokens } from '../../theme';
import { Box, useTheme, Typography } from "@mui/material";
import { Formik } from 'formik';
import { RegisterSchema } from '../../validations';
import ErrorMessage from '../../components/ErrorMessage';
import { firebaseDB, register as firebaseRegister, usersRef } from '../../utils/firebaseConfig';
import { toast } from 'react-toastify';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';

const Register = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const notify = (error) => {
    toast.error(error, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [redirect, setRedirect] = useState(false)


  const initialValues = {
    name,
    surname,
    username,
    email,
    password,
    confirmPassword
  }

  const handleFormSubmit = async (values) => {

    try {
      await axios.post('auth/register', values, {
        headers: { 'Content-Type': 'application/json' }
      })
  
      const user = await firebaseRegister(values.email, values.password)

      await addDoc(usersRef, {
          uid: user.uid,
          firstName: values.name,
          surname: values.surname,
          username: values.username,
          email: user.email
      })

      setRedirect(true)
    }catch (err){
      if(err){
        notify(err.response.data.message)
      }
    }
  }

  if (redirect) {
    return <Navigate to="/auth/login" />
  }

  return (

    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={RegisterSchema}
        >
          {
            ({ values, errors, handleSubmit, touched, handleChange, dirty, isSubmitting }) => (
              <form onSubmit={handleSubmit} className="mt-6 mb-0 space-y-4 rounded-lg p-8 shadow-2xl">
                <p className="text-xl font-medium">Üye ol</p>

                <div>
                  <label htmlFor="name" className="text-sm font-medium">Ad</label>

                  <div className="relative mt-1">
                    <input
                      className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm outline-none text-black"
                      placeholder="Adınız"
                      id='name'
                      onChange={handleChange}
                    />
                    {errors.name && touched.name && (
                      <ErrorMessage error={errors.name} />
                    )}
                  </div>
                </div>
                <div>
                  <label htmlFor="surname" className="text-sm font-medium">Soyad</label>

                  <div className="relative mt-1">
                    <input
                      className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm outline-none text-black"
                      placeholder="Soyadınız"
                      id='surname'
                      onChange={handleChange}
                    />
                    {errors.surname && touched.surname && (
                      <ErrorMessage error={errors.surname} />
                    )}
                  </div>
                </div>
                <div>
                  <label htmlFor="username" className="text-sm font-medium">Kullanıcı Adı</label>

                  <div className="relative mt-1">
                    <input
                      className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm outline-none text-black"
                      placeholder="Kullanıcı adınız"
                      id='username'
                      onChange={handleChange}
                    />
                    {errors.username && touched.username && (
                      <ErrorMessage error={errors.username} />
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="text-sm font-medium">Email</label>

                  <div className="relative mt-1">
                    <input
                      type="email"
                      id='email'
                      className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm outline-none text-black"
                      placeholder="Email hesabınızı giriniz"
                      onChange={handleChange}
                    />
                    {errors.email && touched.email && (
                      <ErrorMessage error={errors.email} />
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="text-sm font-medium">Şifre</label>

                  <div className="relative mt-1">
                    <input
                      type="password"
                      className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm outline-none text-black"
                      placeholder="Şifrenizi giriniz"
                      id='password'
                      onChange={handleChange}
                    />
                    {errors.password && touched.password && (
                      <ErrorMessage error={errors.password} />
                    )}
                    <span className="absolute inset-y-0 right-4 inline-flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </span>
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="text-sm font-medium">Şifre Tekrar</label>

                  <div className="relative mt-1">
                    <input
                      type="password"
                      className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm outline-none text-black"
                      placeholder="Şifrenizi tekrar giriniz"
                      id='confirmPassword'
                      onChange={handleChange}
                    />
                    {errors.confirmPassword && touched.confirmPassword && (
                      <ErrorMessage error={errors.confirmPassword} />
                    )}
                    <span className="absolute inset-y-0 right-4 inline-flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!dirty || isSubmitting}
                  className="block w-full rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white"
                >
                  Üye Ol
                </button>

                <p className="text-center text-sm text-gray-500">
                  Hesabın var mı?
                  <a className="underline" href="/auth/login">Giriş yap</a>
                </p>
              </form>
            )
          }
        </Formik>
      </div>
    </div>
  )
}

export default Register