import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../api/axios";
import { useDispatch } from "react-redux";
import { login } from "../../store/auth";
import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from "../../theme";
import { Formik } from 'formik';
import { LoginSchema } from "../../validations";
import ErrorMessage from '../../components/ErrorMessage';
import { toast } from 'react-toastify';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const initialValues = {
    email,
    password,
  }
const notify = (error) => {
  toast.error(error, {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
}
  const handleFormSubmit = async (values) => {

    try{
      const response = await axios.post('/auth/login', values, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      })

      dispatch(login(response.data))

      if (response.data.role.includes("Admin")) {
        navigate('/admin', {
          replace: true
        })
      } 
      if (response.data.role.includes("Egitimci")){
        navigate('/egitimci', {
          replace: true
        })
      } else {
        navigate('/', {
          replace: true
        })
      }

    } catch (err){
      if(err){
        notify(err.response.data.message)
      }
    }

   
  }

  return (
    <>
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={LoginSchema}
        >
          {
            ({ values, errors, handleSubmit, touched, handleChange, dirty, isSubmitting }) => (
              <form onSubmit={handleSubmit} className="mt-6 mb-0 space-y-4 rounded-lg p-8 shadow-2xl">
                <p className="text-xl font-medium">Hesabına giriş yap</p>

                <div>
                  <label htmlFor="email" className="text-sm font-medium">Email</label>

                  <div className="relative mt-1">
                    <input
                      type="email"
                      id="email"
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
                      id="password"
                      className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm outline-none text-black"
                      placeholder="Şifrenizi giriniz"
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

                <button
                  type="submit"
                  disabled={!dirty || isSubmitting}
                  className="block w-full rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white"
                >
                  Giriş Yap
                </button>

                <p className="text-center text-sm text-gray-500">
                  Hesabın mı yok?
                  <a className="underline" href="/auth/register">Üye ol</a>
                </p>
              </form>
            )
          }
        </Formik>

      </div>
    </div>
    
    </>
  )
}

export default Login