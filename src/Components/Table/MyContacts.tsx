import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { DataGrid } from "@mui/x-data-grid";
import Modal from "../Form/Modal";
import DeleteContact from "../Form/DeleteContact";

const columns = [
  //   { field: "_id", headerName: "ID", width: 70 },
  { field: "name", headerName: "name", width: 130 },
  { field: "email", headerName: "email", width: 130 },
  { field: "address", headerName: "address", width: 130 },
  {
    field: "phone",
    headerName: "phone",
    width: 100,
  },
  {
    field: "Edit",
    headerName: "Edit",
    with: "150px",
    renderCell: (params: any) => {
      return <Modal {...params} />;
    },
  },
  {
    field: "delete",
    headerName: "Del",
    with: "70px",
    renderCell: (params: any) => {
      return <DeleteContact contactId={params.row.id} />;
    },
  },
];

const GET_ALL_CONTACTS = gql`
  query {
    myContacts {
      name
      _id
      email
      address
      phone
    }
  }
`;

export default function DataTable() {
  const { data } = useQuery(GET_ALL_CONTACTS, { pollInterval: 100 });

  return (
    <div style={{ height: 400, width: "40%" }}>
      My contacts
      <DataGrid
        rows={
          data && data.myContacts
            ? data.myContacts
                .map((e: any) => ({
                  id: e._id,
                  name: e.name,
                  phone: e.phone,
                  email: e.email,
                  address: e.address,
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
