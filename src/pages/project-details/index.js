import { Box, Grid, Skeleton, Typography, useTheme, Paper, Modal, Backdrop  } from '@mui/material';
import React, {useState, useEffect} from 'react'
import Avatar from 'react-avatar';
import { Link, useParams } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { tokens } from '../../theme';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDarkReasonable } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { useSelector } from 'react-redux';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #333',
  boxShadow: 24,
  p: 4,
};

const ProjectDetails = () => {
  const params = useParams();
  const { id } = params;

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const axiosPrivate = useAxiosPrivate();
  const { userDetails } = useSelector(state => state.auth); 

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);
  const [categoryLoading, setCategoryLoading] = useState(true);

  const [project, setProject] = useState();
  const [users, setUsers] = useState();
  const [categories, setCategories] = useState()

  const [username, setUsername] = useState();

  const [projectDetails, setProjectDetails] = useState();

  const GetUserByProject = async () => {
    const users = await axiosPrivate.get(`/projects/project/${id}`)
    setUsers(users.data)
    setUserLoading(false)
  }

  const GetProjectDetails = async () => {
    const projectsDetails = await axiosPrivate.get(`/projects/${id}`)
    setProject(projectsDetails.data)
    setProjectDetails(projectsDetails.data.project_Details)
    setLoading(false)
  }

  const GetProjectCategories = async () => {
    const categories = await axiosPrivate.get(`/categories/project/${id}`)
    setCategories(categories.data)
    setCategoryLoading(false)
  }

  const handleUserProject = async (e) => {
    e.preventDefault()
    const project = await axiosPrivate.post(`/projects/AddUserProject?project_Id=${id}&username=${username}`)
    setOpen(false)
    GetUserByProject()
  }

  const data = {
    Project_ID: project?.project_ID,
    Project_Name: project?.project_Name,
    Vote: project?.vote,
    Project_Details: projectDetails,
  }

  const handleProjectUpdate = async (e) => {
    e.preventDefault()
    await axiosPrivate.put("/projects", data)
    setProjectDetails("")
    GetProjectDetails()
    setShow(false)
  }

  useEffect(() => {
    GetUserByProject()
    GetProjectDetails()
    GetProjectCategories()
  }, [])

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box m='20px' className='max-md:pl-20'>
      <Box class="mx-auto max-w-[800px]">
      <Box className='flex justify-between items-center max-md:flex-col max-md:items-start mb-4'>
      {
          loading ? (
            <Skeleton animation="wave" variant='text' height='60px' width='200px' />
          ) : <Typography variant='h2' marginBottom="20px" className='text-3xl'>{project?.project_Name}</Typography>
        }
        {
          users?.map((user) => (
            user?.username === userDetails?.username ? (
              <>
              <Box display='flex' className='gap-2 max-md:flex-col'>
                <button onClick={handleOpen} className="hover:bg-[#544ede] rounded-md bg-[#6A64F1] py-2 px-8 text-center text-base font-semibold text-white outline-none">Projeye Kullanıcı Ekle</button>
                <a href='#projectDetails' onClick={() => setShow(!show)} className="hover:bg-[#0b2a5896] rounded-md bg-[#0b2a58] py-2 px-8 text-center text-base font-semibold text-white outline-none">Projeyi Düzenle</a>
              </Box>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
                keepMounted 
              >
                <Box sx={style}>
                  <Typography onClick={handleClose} display='flex' justifyContent='end' className='cursor-pointer'>X</Typography>
                  <Typography id="transition-modal-title" variant="h4" component="h2">
                    Projeye Kullanıcı Ekle
                  </Typography>
                  <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                    Projeye kullanıcı ekleyebilmek için, eklemek istediğiniz kullanıcının Username yazınız. 
                  </Typography>
                  <form onSubmit={handleUserProject}>
                    <Box>
                      <input
                        type="text"
                        name="username"
                        onChange={(e) => setUsername(e.target.value)}
                        id="username"
                        placeholder="Username"
                        class="w-full mt-2 border border-[#6B7280] rounded-md bg-transparent py-3 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                    </Box>
                    <Box>
                      <button
                        type='submit'
                        className="hover:shadow-form rounded-md mt-2 w-full bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                      >
                        Ekle
                      </button>
                    </Box>
                  </form>
                </Box>
              </Modal>
              </>
            ) : ""
          ))
        }
      </Box>
        <Grid className='mt-8 mb-6' container spacing={1}>
        {
          categoryLoading ? (
            <Skeleton animation="wave" variant='text' height='60px' width='200px' />
          ) : categories?.map((category) => (
                <Link to={`/categories/${category?.category_Name.toLowerCase().replace(/[^\w-]+/g, '-')}`} key={category?.category_ID} className='mr-2'>
                  <Grid item xs={4} md={2}>
                    <Paper className='w-max p-2'>
                      {category?.category_Name}
                    </Paper>
                  </Grid>
                </Link>    
          ))
        }
        </Grid>
        <Typography variant='h5'>Kullanıcılar</Typography>
        {
          userLoading ? (
            <Skeleton animation="wave" variant='text' height='50px' width='150px' />
          ) : (
            <Box className="mb-5 mt-2">
                <Grid container spacing={2}>
                {
                  users?.map((user) => (
                    <Grid item xs={12} md={3} key={user.user_ID}>
                      <Link to={`/${user?.username}`}><Avatar color={theme.palette.mode === "dark" ? '#555' : '#999'} className='rounded-full cursor-pointer' name={`${user?.username}`} size="32" /></Link>
                      <Link className={`text-xl font-bold ml-3`} to={`/${user?.username}`}>{user?.username}</Link>
                    </Grid>
                  ))
                }
                </Grid>
            </Box>
          )
        }
        {
          loading ? (
            <Skeleton animation="wave" variant='rounded' height='350px' width='800px' />
          ) : (
            <ReactMarkdown className='markdown' children={project?.project_Details} components={{
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
          )
        }
        
        {
          show && (
            <>
            <Typography variant="h3" marginTop="20px">Düzenle</Typography>
            <Box className='mt-5' display='flex' flexDirection='column'>
              <textarea
                type="text" 
                placeholder='Düzenle..'
                id='projectDetails'
                rows={5}
                value={projectDetails}
                className="rounded-md py-3 px-6 transition-all border border-[#a8a4f7] text-base font-medium bg-transparent outline-none focus:border-[#6A64F1] focus:shadow-md"
                onChange={(e) => setProjectDetails(e.target.value)}
               />
               <ReactMarkdown className='markdown' children={projectDetails} components={{
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
               <button
                onClick={handleProjectUpdate}
                className="mt-2 hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                Düzenle
              </button>
            </Box>
            </>
          )
        }
      </Box>
    </Box>
  )
}

export default ProjectDetails