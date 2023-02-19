import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar } from "@mui/material";

const columns = [
  //   { field: "_id", headerName: "ID", width: 70 },
  { field: "first_name", headerName: "First name", width: 130 },
  { field: "last_name", headerName: "Last name", width: 130 },
  { field: "email", headerName: "email", width: 130 },
  {
    field: "avatar_img",
    headerName: "avatar",
    width: 100,
    renderCell: (params: any) => {
      return <Avatar src={params.value} />;
    },
  },
];

const GET_USERS = gql`
  query {
    getAllUsers {
      first_name
      last_name
      _id
      email
      avatar_img
    }
  }
`;

export default function DataTable() {
  const { data } = useQuery(GET_USERS, { pollInterval: 100 });

  return (
    <div style={{ height: 400, width: "30%" }}>
      All Users
      <DataGrid
        rows={
          data && data.getAllUsers
            ? data.getAllUsers
                .map((e: any) => ({
                  id: e._id,
                  first_name: e.first_name,
                  last_name: e.last_name,
                  email: e.email,
                  avatar_img: e.avatar_img,
                }))
                .reverse()
            : []
        }
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
