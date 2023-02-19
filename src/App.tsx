import Forms from "./Components/Form/Forms";
import AllTables from "./Components/Table/Tables";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";

import "./App.css";

const GET_ME = gql`
  query {
    me {
      email
      first_name
      last_name
    }
  }
`;

function App(): JSX.Element {
  const { data } = useQuery(GET_ME, { pollInterval: 100 });
  return (
    <div className="App">
      {!data?.me?.email && <Forms data={data} />}

      {data?.me?.email && <AllTables data={data} />}
    </div>
  );
}

export default App;
