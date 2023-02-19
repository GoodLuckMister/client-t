import { useState } from "react";

import Form from "./Form";

import Register from "./Register";

import { Button } from "@mui/material";

type Email = {
  email: string;
};
type Me = {
  me: Email;
};

export interface Props {
  data: Me;
}
function Forms({ data }: Props) {
  const [stateauth, setStateAuth] = useState(false);

  const onChangeState = () => {
    setStateAuth(!stateauth);
  };

  return (
    <div>
      {!stateauth ? (
        <Form onChangeState={onChangeState} />
      ) : (
        <Register onChangeState={onChangeState} />
      )}

      <Button onClick={onChangeState}>{!stateauth ? "Create User" : "Login"}</Button>
    </div>
  );
}

export default Forms;
