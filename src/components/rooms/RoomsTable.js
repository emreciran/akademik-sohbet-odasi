import { DataGrid, GridToolbar, GridActionsCellItem  } from "@mui/x-data-grid";
import React from 'react'
import { tokens } from '../../theme';
import { Box, useTheme, Typography, Badge } from "@mui/material";
import Header from "../Header";
import EditIcon from '@mui/icons-material/Edit';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { toast } from "react-toastify";
import moment from "moment/moment";
import { Link } from "react-router-dom";

const RoomsTable = ({ rooms, openEditRoom, myRooms }) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const notify = (msg) => {
      toast.success(msg, {
        position: "bottom-left",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
  }

    const columns = [
        { 
          field: "roomLink",
          headerName: "Oda Linki",
          renderCell: ({ row }) => {
            if(row.status){
              if(row.roomStartDate === moment().format("l")){
                return (
                  <CopyToClipboard text={`${process.env.REACT_APP_URL}/join/${row.roomId}`} onCopy={() => notify("Kopyalandı!")}>
                      <GridActionsCellItem
                  icon={<ContentCopyIcon />}
                  label="Kopyala"
                  />
                  </CopyToClipboard>
                )
              } else{
                return(
                      <GridActionsCellItem
                      disabled
                  icon={<ContentCopyIcon />}
                  label="Kopyala"
                  />
                )
              }
            }else{
              return (
                    <GridActionsCellItem
                    disabled
                icon={<ContentCopyIcon />}
                label="Kopyala"
                />
              )
            }
          }
        },
        {
          field: "roomName",
          headerName: "Oda Adı",
          flex: 1
        },
        {
          field: "roomType",
          headerName: "Oda Türü",
          flex: 1
        },
        {
          field: "roomStartDate",
          headerName: "Başlama Zamanı",
          flex: 1
        },
        {
          field: "room",
          headerName: "Durumu",
          renderCell: ({ row }) => {
              if(row.status){
                if(row.roomStartDate === moment().format("l")){
                  return (
                    <Link to={`/join/${row.roomId}`}>
                          <Box
                    width="100%"
                    m="0 auto"
                    p="5px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    backgroundColor={colors.greenAccent[600]}
                    borderRadius="4px"
                  >
                    <Typography color={colors.grey[100]}>
                      Odaya Katıl
                    </Typography>
                  </Box>
                    </Link>
                  )
                } else if(moment(row.roomStartDate).isBefore(moment().format("l"))){
                  return(
                    <Box
                    width="100%"
                    m="0 auto"
                    p="5px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    backgroundColor={colors.grey[600]}
                    borderRadius="4px"
                  >
                    <Typography color={colors.primary[100]}>
                      Bitmiş
                    </Typography>
                  </Box>
                  )
                } else if(moment(row.roomStartDate).isAfter(moment().format("l"))){
                  return(
                    <Box
                    width="100%"
                    m="0 auto"
                    p="5px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    backgroundColor={colors.primary[600]}
                    borderRadius="4px"
                  >
                    <Typography color={colors.grey[500]}>
                      Yaklaşan
                    </Typography>
                  </Box>
                  )
                } 
              } else{
                return (
                  <Box
                  width="100%"
                  m="0 auto"
                  p="5px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  backgroundColor={colors.redAccent[600]}
                  borderRadius="4px"
                >
                  <Typography color={colors.grey[100]}>
                    İptal Edilmiş
                  </Typography>
                </Box>
                )
              }
            },
        },
        myRooms ? {
          field: "actions",
          type: "actions",
          getActions: (params) => [
              <GridActionsCellItem 
              disabled={
                !params.row.status ||
                moment(params.row.roomStartDate).isBefore(moment().format("l"))
              }
              icon={<EditIcon />}
              label="Güncelle"
              onClick={() => openEditRoom(params)}
            />
          ]
        } : ""
      ];

  return (
    <Box m="20px">
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
    <DataGrid components={{ Toolbar: GridToolbar }} disableSelectionOnClick pageSize={10} rowsPerPageOptions={[5]} getRowId={(row) => row.roomId} rows={rooms == undefined ? "" : rooms} columns={columns} />

    </Box>
  </Box>
  )
}

export default RoomsTable