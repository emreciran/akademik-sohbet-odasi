import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../api/axios";
import { useDispatch } from "react-redux";
import { login } from "../../store/auth";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const data = {
        email,
        password,
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await axios.post('/auth/login', data, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        })

        dispatch(login(response.data))

        if (response.data.role.includes("Admin")){
          navigate(location.state?.return_url || '/admin', {
            replace: true
          })
        } else { 
          navigate(location.state?.return_url || '/', {
            replace: true
          })
        }
        
    }

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
     <div className="mx-auto max-w-lg">
    <form onSubmit={handleSubmit} className="mt-6 mb-0 space-y-4 rounded-lg p-8 shadow-2xl">
      <p className="text-xl font-medium">Hesabına giriş yap</p>

      <div>
        <label htmlFor="email" className="text-sm font-medium">Email</label>

        <div className="relative mt-1">
          <input
            type="email"
            id="email"
            className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm outline-none"
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
            id="password"
            className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm outline-none"
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

      <button
        type="submit"
        className="block w-full rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white"
      >
        Giriş Yap
      </button>

      <p className="text-center text-sm text-gray-500">
        Hesabın mı yok?
        <a className="underline" href="/auth/kayit">Üye ol</a>
      </p>
    </form>
    </div>
  </div>
  )
}

export default Login