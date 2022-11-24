import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from '../../../theme';

const EditCategory = () => {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    
    const { id } = useParams();
  const [catName, setCatName] = useState("");
  const [status, setStatus] = useState(false);

  const getCategoryDetails = async () => {
    const category = await axiosPrivate.get(`/categories/${id}`)
    setCatName(category.data.category_Name)
    setStatus(category.data.category_Status)
  }


  const data = {
    category_ID: id,
    category_Name: catName,
    category_Status: status
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const updatedCat = await axiosPrivate.put(`/categories`, data);
    navigate("/admin/categories")
  }


  useEffect(() => {
    getCategoryDetails()
  }, [])

    return (
        <div class="flex items-center justify-center p-12">
            <div class="mx-auto w-full max-w-[550px]">
                            <form onSubmit={handleFormSubmit}>

<div class="mb-5">
    <label
        for="category_Name"
        class="mb-3 block text-base font-medium"
    >
        Kategori Adı
    </label>
    <input
        type="text"
        name="category_Name"
        id="category_Name"
        value={catName}
        onChange={(e) => setCatName(e.target.value)}
        placeholder="Kategori Adı"
        class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
    />
    
</div>
<div class="mb-5">
    <input
        type="checkbox"
        name="status"
        id="status"
        onChange={(e) => setStatus(e.target.checked)}
        checked={status}
        class="h-5 w-5"
    />
    <label
        for="status"
        class="pl-3 text-base font-medium"
    >
        Durum
    </label>
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
    )
}

export default EditCategory