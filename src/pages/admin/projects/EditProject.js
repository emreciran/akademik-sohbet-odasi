import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from '../../../theme';

const EditProject = () => {
  const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { id } = useParams();
  const [projectName, setProjectName] = useState("");
  const [projectDetails, setProjectDetails] = useState("");

  const getProjectDetails = async () => {
    const project = await axiosPrivate.get(`/projects/${id}`)
    setProjectName(project.data.project_Name)
    setProjectDetails(project.data.project_Details)
  }
  
  const data = {
    project_ID: id,
    project_Name: projectName,
    project_Details: projectDetails
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProject = await axiosPrivate.put(`/projects`, data);
    navigate("/admin/projects")
  }


  useEffect(() => {
    getProjectDetails()
  }, [])

  return (
    <div class="flex items-center justify-center p-12">
            <div className="mx-auto w-full max-w-[550px]">
                <form onSubmit={handleSubmit}>

                    <div className="mb-5">
                        <label
                            for="projectName"
                            className="mb-3 block text-base font-medium"
                        >
                            Proje Adı
                        </label>
                        <input
                            type="text"
                            name="projectName"
                            id="projectName"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            placeholder="Proje Adı"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>
                    
                    <div class="mb-5">
                        <label
                            for="projectDetails"
                            className="mb-3 block text-base font-medium"
                        >
                            Proje Detay
                        </label>
                        <textarea
                            type="text"
                            name="projectDetails"
                            id="projectDetails"
                            value={projectDetails}
                            onChange={(e) => setProjectDetails(e.target.value)}
                            placeholder="Proje Detay"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
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

export default EditProject