import React, { useState, useEffect } from 'react'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import Swal from 'sweetalert2'
import ProjectsTable from '../../../components/admin/ProjectsTable';

const AdminProjects = () => {
    const axiosPrivate = useAxiosPrivate();
    const [projects, setProjects] = useState()
  
    const getProjects = async () => {
      const projectsData = await axiosPrivate.get('/projects')
      setProjects(projectsData.data)
    }

    const DeleteProject = async (id) => {
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
                const deletedProject = await axiosPrivate.delete(`/projects/${id}`)
                await getProjects()
              swalWithBootstrapButtons.fire(
                'Silindi!',
                'Proje başarıyla silindi!',
                'success'
              )
            } else if (
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'İptal edildi!',
                'Proje silinmedi!',
                'error'
              )
            }
          })
        
      }

    useEffect(() => {
        getProjects()
      }, [])
    
  return (
      <ProjectsTable projects={projects} DeleteProject={DeleteProject} />
  )
}

export default AdminProjects