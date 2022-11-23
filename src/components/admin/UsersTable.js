import React, {useState} from 'react'
import { Box, useTheme, Typography } from "@mui/material";
import { DataGrid, GridToolbar, GridActionsCellItem  } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../Header";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from "react-router-dom";

const UsersTable = ({ users }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
      { field: "user_ID", headerName: "#" },
      {
        field: "name",
        headerName: "Ad",
        flex: 1
      },
      {
        field: "surname",
        headerName: "Soyad",
        flex: 1
      },
      {
        field: "email",
        headerName: "Email",
        flex: 1
      },
      {
        field: "username",
        headerName: "Username",
        flex: 1
      },
      {
        field: "role",
        headerName: "Rol",
      },
      {
        field: "status",
        headerName: "Durumu",
        renderCell: ({ row }) => {
            return (
              <Box
                width="100%"
                m="0 auto"
                p="5px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                backgroundColor={
                  row.status === true
                    ? colors.greenAccent[600]
                    : colors.redAccent[600]
                }
                borderRadius="4px"
              >
                <Typography color={colors.grey[100]}>
                  {row.status === true ? 'Aktif': 'Pasif'}
                </Typography>
              </Box>
            );
          },
      },
      {
        field: "actions",
        type: "actions",
        getActions: (params) => [
          <Link to={`/admin/users/${params.id}`}>
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
      <Header title="Kullanıcılar" />
      <Box
        m="40px 0 0 0"
        height="420px !important"
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
          },
        }}
      >
      <DataGrid components={{ Toolbar: GridToolbar }} disableSelectionOnClick pageSize={5} rowsPerPageOptions={[5]} getRowId={(row) => row.user_ID} rows={users == undefined ? "" : users} columns={columns} />

      </Box>
    </Box>
  )
}

export default UsersTable