import { useTheme } from '@mui/material';
import React, {useState} from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {CategoryOptions} from '../../data/Categories'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { tokens } from '../../theme';
import { MultiSelect } from "react-multi-select-component";
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {atomOneDarkReasonable} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Header from '../../components/Header';
import { Box } from '@mui/system';

const NewProject = () => {
    const { userDetails } = useSelector(state => state.auth); 
    const axiosPrivate = useAxiosPrivate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();

    const [projectName, setProjectName] = useState();
    const [projectDetails, setProjectDetails] = useState();
    const [categories, setCategories] = useState([])
    
    const data = {
        Project_Name: projectName,
        Project_Details: projectDetails,
        Vote: 0,
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        if (categories) {
          const project = await axiosPrivate.post(`/projects?user_Id=${userDetails?.user_ID}&${categories?.map(category => (`catIds=${category.value}&`)).join("")}`, data)
        }
        navigate("/projects")
      }
  return (
    <Box m='20px' className='max-md:pl-20'>
    <Header title='Yeni Proje' />
    <Box>
      <div class="flex items-center justify-center">
        <div class="mx-auto w-full max-w-[800px]">
          <form onSubmit={handleSubmit}>

            <div class="mb-5">
              <label
                for="projectName"
                class="mb-3 block text-base font-medium"
              >
                Proje Başlığı
              </label>
              <input
                type="text"
                name="projectName"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                id="projectName"
                placeholder="Proje başlığı giriniz.."
                className="w-full bg-transparent rounded-md border transition-all border-[#a8a4f7] py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className='mb-5'>
            <label
                for="projectDetails"
                class="mb-3 block text-base font-medium"
              >
                Proje İçeriği
              </label>
              <textarea
               id="projectDetails"
               name="projectDetails"
               placeholder='Proje içeriği giriniz..' 
               value={projectDetails}
               rows={10}
               onChange={(e) => setProjectDetails(e.target.value)}
               class="w-full rounded-md border border-[#a8a4f7] bg-transparent transition-all py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
               <ReactMarkdown children={projectDetails}  components={{
                code({node, inline, className, children, ...props}) {
                  const match = /language-(\w+)/.exec(className || '')
                  return !inline && match ? (
                    <SyntaxHighlighter
                      children={String(children).replace(/\n$/, '')}
                      style={atomOneDarkReasonable}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    />
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  )
                }
               }} />
            </div>
            <div className='mb-5'>
            <label
                for="categories"
                class="mb-3 block text-base font-medium"
              >
                Kategori seçiniz
              </label>
              <MultiSelect
              options={CategoryOptions}
              value={categories}
              onChange={setCategories}
              labelledBy="Kategori seçiniz"
              className='text-black'
              />
            </div>
            <div className='flex flex-col'>
              <button
                type='submit'
                className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
              >
                Ekle
              </button>
              <button type='button' className='mt-4' onClick={() => navigate(-1)}>Geri Dön</button>
            </div>
          </form>
        </div>
      </div>
    </Box>
  </Box>
  )
}

export default NewProject