import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDarkReasonable } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { Box, Card, CardActions, CardContent, IconButton, Paper, Tab, Tabs, Typography, useTheme } from '@mui/material';
import Avatar from 'react-avatar';
import { tokens } from '../../theme';
import { QuestionAnswerSharp } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import FavoriteIcon from '@mui/icons-material/Favorite';

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
  const { userDetails } = useSelector(state => state.auth)
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const axiosPrivate = useAxiosPrivate();

  const [question, setQuestion] = useState();
  const [answers, setAnswers] = useState();
  const [comments, setComments] = useState();

  const [answerContent, setAnswerContent] = useState("");
  const [commentContent, setCommentContent] = useState("");

  const [show, setShow] = useState(false);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const GetQuestionDetails = async () => {
    const questionsDetails = await axiosPrivate.get(`/questions/${id}`)
    setQuestion(questionsDetails.data)
  }

  const GetQuestionAnswerDetails = async () => {
    const answers = await axiosPrivate.get(`/answers/question/${id}`)
    setAnswers(answers.data)
  }

  const GetQuestionCommentDetails = async () => {
    const comments = await axiosPrivate.get(`/comments/question/${id}`)
    setComments(comments.data)
  }

  const handleSubmitAnswer = async (e) => {
    e.preventDefault()

    if (answerContent !== "") {
      const data = {
        Question_ID: question.question_ID,
        AnswerContent: answerContent,
        Username: userDetails?.username,
        Vote: 0,
      }

      await axiosPrivate.post("/answers", data);
    }

    setAnswerContent('')
    GetQuestionAnswerDetails()
  }

  const handleSubmitComment = async (e) => {
    e.preventDefault()

    if (commentContent !== "") {
      const data = {
        Question_ID: question.question_ID,
        CommentContent: commentContent,
        Username: userDetails?.username,
      }

      await axiosPrivate.post("/comments", data);
    }

    setCommentContent('')
    GetQuestionCommentDetails()
    setShow(false)
  }

  useEffect(() => {
    GetQuestionDetails()
    GetQuestionAnswerDetails()
    GetQuestionCommentDetails()
  }, [])

  return (
    <Box m='20px' className='max-md:pl-20'>
      <Box class="mx-auto max-w-[800px]">
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
            <Typography fontSize={22}>Yorumlar ({`${comments?.length}`})</Typography>
          </Box>
        {
          comments?.map((comment) => (
            <Card key={comment?.id} className='mt-5 w-2/4' sx={{ minWidth: 275, backgroundColor: 'transparent' }}>
              <CardContent>
              <Box className="mb-5">
                  <Link to={`/${comment?.username}`}><Avatar color={theme.palette.mode === "dark" ? '#555' : '#999'} className='rounded-full cursor-pointer' name={`${comment?.username}`} size="32" /></Link>
                  <Link to={`/${comment?.username}`} class="text-lg font-bold ml-3 text-amber-400">{comment?.username}</Link>
                </Box>
                <ReactMarkdown className='markdown' children={comment.commentContent} components={{
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
              </CardContent>
            </Card>
          ))
        }

        <Typography className='cursor-pointer' marginBottom='1.2rem' marginTop='1.2rem' onClick={() => setShow(!show)}>Yorum Ekle</Typography>
        {
          show && (
            <Box className='mt-5' display='flex' flexDirection='column'>
              <textarea
                type="text" 
                placeholder='Yorum ekle...'
                id='comment'
                rows={5}
                value={commentContent}
                className="w-2/4 rounded-md py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                onChange={(e) => setCommentContent(e.target.value)}
               />
               <button
                onClick={handleSubmitComment}
                className="w-1/6 mt-2 hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                Gönder
              </button>
            </Box>
          )
        }

        <Box className='mt-5'>
          <Typography fontSize={22}>Cevap Yaz</Typography>
          <Tabs textColor="secondary" indicatorColor="secondary" value={value} onChange={handleChange} aria-label="secondary tabs example">
            <Tab label="Markdown" {...a11yProps(0)} />
            <Tab label="Önizleme" {...a11yProps(1)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <textarea
              id="answer"
              name="answer"
              placeholder='Cevap yazınız...'
              value={answerContent}
              rows={6}
              onChange={(e) => setAnswerContent(e.target.value)}
              className="w-full rounded-md py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ReactMarkdown className='markdown' children={answerContent} components={{
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
          </TabPanel>
          <button
            onClick={handleSubmitAnswer}
            className="w-1/6 hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
            Gönder
          </button>
        </Box>

        <Box className='mt-5'>
          <Typography fontSize={22}>Cevaplar ({`${answers?.length}`})</Typography>
        </Box>
        <Box>
          {answers?.map((answer) => (

            <Card key={answer?.answer_ID} className='mt-5' sx={{ minWidth: 275, backgroundColor: 'transparent' }}>
              <CardContent>
                <Box className="mb-5">
                  <Link to={`/${answer?.username}`}><Avatar color={theme.palette.mode === "dark" ? '#555' : '#999'} className='rounded-full cursor-pointer' name={`${answer?.username}`} size="32" /></Link>
                  <Link to={`/${answer?.username}`} class="text-lg font-bold ml-3 text-amber-400">{answer?.username}</Link>
                </Box>
                <ReactMarkdown className='markdown' children={answer.answerContent} components={{
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
              </CardContent>
              <CardActions>
                <Box display='flex' alignItems='center'>
                  <IconButton className='p-2 gap-2' >
                    <FavoriteIcon />
                    <Typography>{answer?.vote}</Typography>
                  </IconButton>
                  <Typography marginLeft='10px'>#{answer?.answer_ID}</Typography>
                </Box>
              </CardActions>
            </Card>

          ))}
        </Box>
      </Box>

    </Box>
  )
}

export default SoruDetay