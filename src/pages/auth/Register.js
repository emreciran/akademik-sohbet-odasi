import React, {useState} from 'react'
import { Navigate } from 'react-router-dom';
import axios from '../../api/axios';
import { tokens } from '../../theme';
import { Box, useTheme, Typography } from "@mui/material";

const Register = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [redirect, setRedirect] = useState(false)

    const data = {
        name,
        surname,
        username,
        email,
        password,
        confirmPassword,
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios.post('auth/register', data, {
          headers: { 'Content-Type': 'application/json' }
        })

        setRedirect(true)
    }

    if (redirect){
        return <Navigate to="/auth/giris" />
    }

  return (

  <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
  <div className="mx-auto max-w-lg">
 <form onSubmit={handleSubmit} className="mt-6 mb-0 space-y-4 rounded-lg p-8 shadow-2xl">
   <p className="text-xl font-medium">Üye ol</p>

   <div>
     <label htmlFor="email" className="text-sm font-medium">Ad</label>

     <div className="relative mt-1">
       <input
         className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm outline-none text-black"
         placeholder="Adınız"
         onChange={e => setName(e.target.value)}
       />

     </div>
   </div>
   <div>
     <label htmlFor="email" className="text-sm font-medium">Soyad</label>

     <div className="relative mt-1">
       <input
         className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm outline-none text-black"
         placeholder="Soyadınız"
         onChange={e => setSurname(e.target.value)}
       />

     </div>
   </div>
   <div>
     <label htmlFor="email" className="text-sm font-medium">Kullanıcı Adı</label>

     <div className="relative mt-1">
       <input
         className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm outline-none text-black"
         placeholder="Kullanıcı adınız"
         onChange={e => setUserName(e.target.value)}
       />

     </div>
   </div>

   <div>
     <label htmlFor="email" className="text-sm font-medium">Email</label>

     <div className="relative mt-1">
       <input
         type="email"
         className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm outline-none text-black"
         placeholder="Email hesabınızı giriniz"
         onChange={e => setEmail(e.target.value)}
       />

     </div>
   </div>

   <div>
     <label htmlFor="password" className="text-sm font-medium">Şifre</label>

     <div className="relative mt-1">
       <input
         type="password"
         className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm outline-none text-black"
         placeholder="Şifrenizi giriniz"
         onChange={e => setPassword(e.target.value)}
       />

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
         onChange={e => setConfirmPassword(e.target.value)}
       />

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
     className="block w-full rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white"
   >
      Üye Ol
   </button>

   <p className="text-center text-sm text-gray-500">
     Hesabın var mı?
     <a className="underline" href="/auth/giris">Giriş yap</a>
   </p>
 </form>
 </div>
</div>
  )
}

export default Register