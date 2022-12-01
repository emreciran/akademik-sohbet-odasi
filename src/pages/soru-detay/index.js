import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDarkReasonable } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { Box, Tab, Tabs, Typography, useTheme } from '@mui/material';
import Avatar from 'react-avatar';
import { tokens } from '../../theme';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const SoruDetay = () => {
  const params = useParams();
  const { id } = params;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const axiosPrivate = useAxiosPrivate();
  const [question, setQuestion] = useState()

  const [answer, setAnswer] = useState()

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const GetQuestionDetails = async () => {
    const questionsDetails = await axiosPrivate.get(`/questions/${id}`)
    setQuestion(questionsDetails.data)
  }

  useEffect(() => {
    GetQuestionDetails()
  }, [])

  return (
    <Box m='20px' className='max-md:pl-20'>


      <div class="mx-auto max-w-[800px]">
        <h2 className='mb-5 text-xl'>{question?.title}</h2>
        <Box className="mb-5">
          <Link to={`/${question?.username}`}><Avatar color={theme.palette.mode === "dark" ? '#555' : '#999'} className='rounded-full cursor-pointer' name={`${question?.username}`} size="32" /></Link>
          <Link to={`/${question?.username}`} class="text-lg font-bold ml-3 text-amber-400">{question?.username}</Link>
        </Box>
        <ReactMarkdown className='markdown' children={question?.content} components={{
          code({ node, inline, className, children, ...props }) {
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
        <Box className='mt-5'>
          <h3 className='text-xl'>Cevap Yaz</h3>
          <Tabs textColor="secondary" indicatorColor="secondary" value={value} onChange={handleChange} aria-label="secondary tabs example">
          <Tab label="Markdown" {...a11yProps(0)} />
          <Tab label="Önizleme" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0}>
        <textarea
                 id="answer"
                 name="answer"
                 placeholder='Cevap yazınız...' 
                 value={answer}
                 rows={6}
                 onChange={(e) => setAnswer(e.target.value)}
                 class="w-full rounded-md py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ReactMarkdown className='markdown' children={answer}  components={{
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
        </TabPanel>
        <button
                  className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                >
                  Gönder
        </button>
        </Box>

        <Box className='mt-5'>
          <h3 className='text-xl'>Cevaplar (0)</h3>
        </Box>
      </div>

    </Box>
  )
}

export default SoruDetay