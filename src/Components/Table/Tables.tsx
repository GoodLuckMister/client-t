import AllContactsTable from "./Contact";
import MyContacts from "./MyContacts";
import BasicTable from "./BasicTable";
import Register from "../Form/Register";
import { Props } from "../Form/Forms";
import CreateContact from "../Form/CreateContact";

export default function AllTables({ data }: Props) {
  return (
    <>
      <div style={{ display: "flex", marginBottom: 50 }}>
        <AllContactsTable />
        <MyContacts />
        <BasicTable />
      </div>
      <div>
        {data?.me?.email && (
          <div style={{ display: "flex" }}>
            <Register onChangeState={() => {}} />
            <CreateContact onChangeState={() => {}} />
          </div>
        )}
      </div>
    </>
  );
}
