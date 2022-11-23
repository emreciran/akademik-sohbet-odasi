import React from 'react'
import { Link } from 'react-router-dom';
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../Header";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ProjectsTable = ({ projects, DeleteProject }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
      { field: "project_ID", headerName: "#", sortable: "false" },
      {
        field: "project_Name",
        headerName: "Proje Adı",
        flex: 1,
      },
      {
        field: "actions",
        type: "actions",
        getActions: (params) => [
        <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Sil"
            onClick={() => DeleteProject(params.id)}
          />,
          <Link to={`/admin/projects/${params.id}`}>
            <GridActionsCellItem 
            icon={<EditIcon />}
            label="Güncelle"
          />
          </Link>
        ]
      },
    ];
    

  return (

    <Box m="20px">
      <Header title="Projeler" />
      <Box
        m="40px 0 0 0"
        height="420px"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            fontSize: '16px',
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiButtonBase-root": {
            color: colors.primary[100],
          },
          "& .MuiButtonBase-root:hover": {
            backgroundColor: colors.grey[800]
          }
        }}
      >
      <DataGrid components={{ Toolbar: GridToolbar }} disableSelectionOnClick pageSize={5} rowsPerPageOptions={[5]} getRowId={(row) => row.project_ID} rows={projects == undefined ? "" : projects} columns={columns} />

      </Box>
    </Box>
  )
}

export default ProjectsTable