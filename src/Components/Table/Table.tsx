import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { Card } from "@mui/material";

const GET_ME = gql`
  query {
    me {
      email
      first_name
      last_name
    }
  }
`;
function Table() {
  const { data } = useQuery(GET_ME);

  return (
    <div>
      {data && <Card>{data?.me?.first_name}</Card>}
      <h1>Hello</h1>
    </div>
  );
}

export default Table;
