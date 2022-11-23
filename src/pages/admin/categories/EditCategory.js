import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from '../../../theme';
import { Formik } from 'formik';
import * as yup from "yup";

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
  const initialValues = {
    category_ID: id,
    category_Name: catName,
    category_Status: status
}

const categorySchema = yup.object().shape({
    category_Name: yup.string().required("Kategori adı boş bırakılamaz!")
})


  const data = {
    category_ID: id,
    category_Name: catName,
    category_Status: status
  }

  const handleFormSubmit = async (values) => {
    const updatedCat = await axiosPrivate.put(`/categories`, values);
    navigate("/admin/categories")
  }


  useEffect(() => {
    getCategoryDetails()
  }, [])

    return (
        <div class="flex items-center justify-center p-12">
            <div class="mx-auto w-full max-w-[550px]">
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                    validationSchema={categorySchema}
                >
                    {
                        ({ values, errors, handleSubmit, touched, handleChange, dirty, isSubmitting }) => (
                            <form onSubmit={handleSubmit}>

<div class="mb-5">
    <label
        for="catName"
        class="mb-3 block text-base font-medium text-[#07074D]"
    >
        Kategori Adı
    </label>
    <input
        type="text"
        name="catName"
        id="catName"
        value={values.category_Name}
        onChange={handleChange}
        placeholder="Kategori Adı"
        class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
    />
    {errors.category_Name && touched.category_Name && (
                                            <p class="mt-2 text-sm text-red-600 dark:text-red-500">{errors.category_Name}</p>
                                        )}
</div>
<div class="mb-5">
    <input
        type="checkbox"
        name="status"
        id="status"
        value={values.category_Status}
        onChange={handleChange}
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
        disabled={!dirty || isSubmitting}
        type='submit'
        className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
        >
        Güncelle
    </button>
    <button type='button' className='mt-4' onClick={() => navigate(-1)}>Geri Dön</button>

</div>
</form>
                        )
                    }
                
                </Formik>
            </div>
        </div>
    )
}

export default EditCategory