import React, { useEffect, useState } from 'react'
import { Box, useTheme, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { tokens } from '../../../theme';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import { Formik } from 'formik';
import * as yup from "yup";

const AddCategory = () => {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


    const initialValues = {
        category_Name: "",
        category_Status: false
    }
    const handleFormSubmit = async (values) => {
        const newCat = await axiosPrivate.post(`/categories`, values);
        navigate("/admin/categories")
      };

    const categorySchema = yup.object().shape({
        category_Name: yup.string().required("Kategori adı boş bırakılamaz!")
    })


    return (
        <Box>
            <Box class="flex items-center justify-center p-12">
                <Box class="mx-auto w-full max-w-[550px]">

                    <Formik
                        onSubmit={handleFormSubmit}
                        initialValues={initialValues}
                        validationSchema={categorySchema}
                    >
                        {
                            ({ values, errors, handleSubmit, touched, handleChange, dirty, isSubmitting }) => (
                                <form onSubmit={handleSubmit}>

                                    <Box class="mb-5">
                                        <label
                                            for="catName"
                                            class="mb-3 block text-base font-medium"
                                        >
                                            Kategori Adı
                                        </label>
                                        <input
                                            type="text"
                                            name="category_Name"
                                            id="catName"
                                            value={values.category_Name}
                                            onChange={handleChange}
                                            placeholder="Kategori Adı"
                                            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        />
                                        {errors.category_Name && touched.category_Name && (
                                            <p class="mt-2 text-sm text-red-600 dark:text-red-500">{errors.category_Name}</p>
                                        )}
                                    </Box>
                                    <Box class="mb-5">
                                        <input
                                            type="checkbox"
                                            name="category_Status"
                                            id="status"
                                            value={values.category_Status}
                                            onChange={handleChange}
                                            class="h-5 w-5"
                                        />
                                        <label
                                            for="status"
                                            class="pl-3 text-base font-medium"
                                        >
                                            Durum
                                        </label>
                                    </Box>
                                    <Box className='flex flex-col'>
                                        <button
                                            disabled={!dirty || isSubmitting}
                                            type='submit'
                                            className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                                        >
                                            Ekle
                                        </button>
                                        <button type='button' className='mt-4' onClick={() => navigate(-1)}>Geri Dön</button>
                                    </Box>
                                </form>
                            )
                        }
                    </Formik>
                </Box>
            </Box>
        </Box>
    )
}

export default AddCategory