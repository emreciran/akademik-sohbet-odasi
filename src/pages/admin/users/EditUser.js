import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'

const EditUser = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState(false);

  const { id } = useParams();

  const getUserDetails = async () => {
    const user = await axiosPrivate.get(`/user/${id}`)
    setName(user.data.name)
    setSurname(user.data.surname)
    setEmail(user.data.email)
    setUsername(user.data.username)
    setRole(user.data.role)
    setStatus(user.data.status)
  }

  const data = {
    User_ID: id,
    Name: name,
    Surname: surname,
    Email: email,
    Username: username,
    Role: role,
    Status: status
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedUser = await axiosPrivate.put(`/user/UpdateUser`, data);
    navigate("/admin/users")
  }

  useEffect(() => {
    getUserDetails()
  }, [])

  return (
    <div class="flex items-center justify-center p-12">
      <div class="mx-auto w-full max-w-[550px]">
        <form onSubmit={handleSubmit}>
          <div class="-mx-3 flex flex-wrap">
            <div class="w-full px-3 sm:w-1/2">
              <div class="mb-5">
                <label
                  for="name"
                  class="mb-3 block text-base font-medium text-[#07074D]"
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
                  class="mb-3 block text-base font-medium text-[#07074D]"
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

          <div class="mb-5">
            <label
              for="email"
              class="mb-3 block text-base font-medium text-[#07074D]"
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

          <div class="mb-5">
            <label
              for="username"
              class="mb-3 block text-base font-medium text-[#07074D]"
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


          <div class="mb-5">
            <label class="mb-3 block text-base font-medium text-[#07074D]">
              Role
            </label>
            <div class="flex items-center space-x-6">
              <div class="flex items-center">
                <input
                  type="radio"
                  name="Role"
                  checked={role === "Admin"}
                  value="Admin"
                  onChange={(e) => setRole(e.target.value)}
                  id="admin"
                  class="h-5 w-5"
                />
                <label
                  for="admin"
                  class="pl-3 text-base font-medium text-[#07074D]"
                >
                  Admin
                </label>
              </div>
              <div class="flex items-center">
                <input
                  type="radio"
                  name="Role"
                  id="ogrenci"
                  checked={role === "Ogrenci"}
                  value="Ogrenci"
                  onChange={(e) => setRole(e.target.value)}
                  class="h-5 w-5"
                />
                <label
                  for="ogrenci"
                  class="pl-3 text-base font-medium text-[#07074D]"
                >
                  Öğrenci
                </label>
              </div>
              <div class="flex items-center">
                <input
                  type="radio"
                  name="Role"
                  id="egitimci"
                  value="Egitimci"
                  checked={role === "Egitimci"}
                  onChange={(e) => setRole(e.target.value)}
                  class="h-5 w-5"
                />
                <label
                  for="egitimci"
                  class="pl-3 text-base font-medium text-[#07074D]"
                >
                  Eğitimci
                </label>
              </div>
            </div>
          </div>
          <div class="mb-5">
            <input
              type="checkbox"
              name="Status"
              id="status"
              onChange={(e) => setStatus(e.target.checked)}
              checked={status}
              class="h-5 w-5"
            />
            <label
              for="status"
              class="pl-3 text-base font-medium text-[#07074D]"
            >
              Durum
            </label>
          </div>
          <div className='flex flex-col'>
            <button
              type='submit'
              className="border border-green-700 bg-green-700 text-white rounded-md px-4 py-2 transition duration-500 ease select-none hover:bg-green-800 focus:outline-none focus:shadow-outlinehover:shadow-form text-center text-base font-semibold outline-none"
              >
              Güncelle
            </button>
            <button className='mt-4' onClick={() => navigate(-1)}>Geri Dön</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditUser