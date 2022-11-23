import React, { useState, useEffect } from 'react'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import Swal from 'sweetalert2'
import CategoriesTable from '../../../components/admin/CategoriesTable';

const Categories = () => {
  const axiosPrivate = useAxiosPrivate();
  const [categories, setCategories] = useState()

  const getCategories = async () => {
    const categoriesData = await axiosPrivate.get('/categories')
    setCategories(categoriesData.data)
  }
  
  
  const DeleteCategory = async (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline',
          cancelButton: 'border border-red-500 bg-red-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Emin misin?',
        text: '',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Evet, sil!',
        cancelButtonText: 'Hayır, iptal et!',
        reverseButtons: true
      }).then(async (result) => {
        if (result.isConfirmed) {
            const deletedCat = await axiosPrivate.delete(`/categories/${id}`)
            await getCategories()
          swalWithBootstrapButtons.fire(
            'Silindi!',
            'Kategori başarıyla silindi!',
            'success'
          )
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'İptal edildi!',
            'Kategori silinmedi!',
            'error'
          )
        }
      })
    
  }

  useEffect(() => {
    getCategories()
  }, [])

  return(
      <CategoriesTable categories={categories} DeleteCategory={DeleteCategory} />
  )
  
}



export default Categories