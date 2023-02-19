import { useState } from "react";
import { useForm } from "react-hook-form";
import { FilledInput, FormGroup, Button } from "@mui/material";
import { Prop } from "./Register";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const LOGIN = gql`
  mutation login($input: LoginInput!) {
    login(input: $input)
  }
`;

export default function FormComponent({ onChangeState }: Prop) {
  const {
    register,
    formState: { errors },
  } = useForm();

  const [state, setFormState] = useState({
    email: "",
    password: "",
  });

  const [login, { data }] = useMutation(LOGIN);

  const onChangeInputs = (e: any) => {
    setFormState({ ...state, [e.target.name]: e.target.value });
  };

  const onCliLogin = () => {
    login({ variables: { input: { ...state } } });
    if (data?.login) {
      data.setCookies();
    }
  };

  return (
    <div style={{ width: "800px", margin: "auto" }}>
      <FormGroup>
        {/* include validation with required or other standard HTML validation rules */}
        <FilledInput
          value={state.email}
          placeholder="email"
          aria-label="email"
          {...register("email", { required: true })}
          onChange={onChangeInputs}
          name="email"
        />
        <FilledInput
          value={state.password}
          placeholder="password"
          aria-label="password"
          {...register("password", { required: true })}
          onChange={onChangeInputs}
          name="password"
        />

        {errors.exampleRequired && <span>This field is required</span>}
        <Button onClick={onCliLogin} variant="contained" disableElevation>
          Login
        </Button>
      </FormGroup>
    </div>
  );
}
