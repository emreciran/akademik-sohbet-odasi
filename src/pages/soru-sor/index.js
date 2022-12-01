import React, { useState, useEffect } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { tokens } from '../../theme';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {atomOneDarkReasonable} from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { MultiSelect } from "react-multi-select-component";
import { useSelector } from 'react-redux';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const options = [
  { label: "JavaScript", value: 10 },
  { label: "CSS", value: 11 },
  { label: "HTML", value: 12 },
  { label: "C#", value: 13 },
  { label: "Python", value: 14 },
  { label: "C++", value: 15 },
  { label: "Unity", value: 16 },
  { label: "ReactJS", value: 17 },
  { label: ".Net Core", value: 18 },
  { label: "MSSQL", value: 19 },
  { label: "MYSQL", value: 20 },
  { label: "Firebase", value: 21 },
]

const SoruSor = () => {
  const { userDetails } = useSelector(state => state.auth); 
  const axiosPrivate = useAxiosPrivate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [tags, setTags] = useState([])

  const data = {
    Title: title,
    Content: content,
    Vote: 0,
    View: 0,
    Username: userDetails?.username,
    User_ID: userDetails?.user_ID,
  }


  const handleSubmit = async(e) => {
    e.preventDefault()
    if (tags) {
      const question = await axiosPrivate.post(`/questions?${tags?.map(tag => (`tagIds=${tag.value}&`)).join("")}`, data)
    }
    navigate("/soru-cevap")
  }


  return (
    <Box m='20px' className='max-md:pl-20'>
      <Header title='Soru Sor' />
      <Box>
        <div class="flex items-center justify-center">
          <div class="mx-auto w-full max-w-[800px]">
            <form onSubmit={handleSubmit}>

              <div class="mb-5">
                <label
                  for="title"
                  class="mb-3 block text-base font-medium"
                >
                  Soru Başlığı
                </label>
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  id="title"
                  placeholder="Soru başlığı giriniz.."
                  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              <div className='mb-5'>
              <label
                  for="content"
                  class="mb-3 block text-base font-medium"
                >
                  Soru İçeriği
                </label>
                <textarea
                 id="content"
                 name="content"
                 placeholder='Soru içeriği giriniz..' 
                 value={content}
                 rows={10}
                 onChange={(e) => setContent(e.target.value)}
                 class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                 <ReactMarkdown children={content}  components={{
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
                  for="tags"
                  class="mb-3 block text-base font-medium"
                >
                  Tag seçiniz
                </label>
                <MultiSelect
                options={options}
                value={tags}
                onChange={setTags}
                labelledBy="Tag seçiniz"
                className='text-black'
                />
              </div>
              <div className='flex flex-col'>
                <button
                  type='submit'
                  className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                >
                  Sor
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


export default SoruSor