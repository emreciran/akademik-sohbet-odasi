import { Grid } from '@mui/material'
import React from 'react'
import ProjectItem from './ProjectItem'

const ProjectList = ({ projects }) => {
  return (
    <>
        {projects?.map((project) => (
            <Grid item xs={12} md={6} key={project.project_ID}>
                <ProjectItem project={project} />
            </Grid>
        ))}
    </>
  )
}

export default ProjectList