import { Box, useTheme, Typography } from "@mui/material";
import { DataGrid, GridToolbar, GridActionsCellItem  } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../Header";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from "react-router-dom";


const CategoriesTable = ({ categories, DeleteCategory }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
      { field: "category_ID", headerName: "#" },
      {
        field: "category_Name",
        headerName: "Kategori Adı",
        flex: 1,
      },
      {
        field: "category_Status",
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
                  row.category_Status === true
                    ? colors.greenAccent[600]
                    : colors.redAccent[600]
                }
                borderRadius="4px"
              >
                <Typography color={colors.grey[100]}>
                  {row.category_Status === true ? 'Aktif': 'Pasif'}
                </Typography>
              </Box>
            );
          },
      },
      {
        field: "actions",
        type: "actions",
        getActions: (params) => [
        <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Sil"
            onClick={() => DeleteCategory(params.id)}
          />,
          <Link to={`/admin/categories/${params.id}`}>
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
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Header title="Kategoriler" />
        <Link to='/admin/categories/add' className="hover:bg-[#544ede] rounded-md bg-[#6A64F1] py-2 px-8 text-center text-base font-semibold text-white outline-none">Ekle</Link>
      </Box>
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
      <DataGrid components={{ Toolbar: GridToolbar }} disableSelectionOnClick pageSize={5} rowsPerPageOptions={[5]} getRowId={(row) => row.category_ID} rows={categories == undefined ? "" : categories} columns={columns} />

      </Box>
    </Box>
)
}

export default CategoriesTable