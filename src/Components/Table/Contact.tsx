import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "name", headerName: "name", width: 130 },
  { field: "email", headerName: "email", width: 130 },
  { field: "address", headerName: "address", width: 130 },
  {
    field: "phone",
    headerName: "phone",
    width: 100,
  },
];

const GET_ALL_CONTACTS = gql`
  query {
    contacts {
      _id
      name
      address
      email
      phone
    }
  }
`;

export default function DataTable() {
  const { data } = useQuery(GET_ALL_CONTACTS, { pollInterval: 100 });

  return (
    <div style={{ height: 400, width: "30%" }}>
      All contacts
      <DataGrid
        rows={
          data && data.contacts
            ? data.contacts
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
