import { useState } from "react";
import { useForm } from "react-hook-form";
import { FilledInput, FormGroup, Button } from "@mui/material";

import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const CREATE_USER = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      first_name
      last_name
      email
      _id
    }
  }
`;

export interface Prop {
  onChangeState: () => void;
}

export default function FormComponent({ onChangeState }: Prop) {
  const {
    register,
    formState: { errors },
  } = useForm();

  const [state, setFormState] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  const [createUser] = useMutation(CREATE_USER);

  const onChangeInputs = (e: any) => {
    setFormState({ ...state, [e.target.name]: e.target.value });
  };

  const onClickRegister = () => {
    createUser({ variables: { input: { ...state } } });
    setFormState({
      email: "",
      password: "",
      first_name: "",
      last_name: "",
    });
  };

  return (
    <div style={{ width: "800px", margin: "auto" }}>
      <FormGroup>
        {/* include validation with required or other standard HTML validation rules */}

        <FilledInput
          value={state.first_name}
          placeholder="first_name"
          aria-label="first_name"
          {...register("first_name", { required: true })}
          onChange={onChangeInputs}
          name="first_name"
        />

        <FilledInput
          value={state.last_name}
          placeholder="last_name"
          aria-label="last_name"
          {...register("last_name", { required: true })}
          onChange={onChangeInputs}
          name="last_name"
        />
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
        <Button onClick={onClickRegister} variant="contained" disableElevation>
          Register
        </Button>
      </FormGroup>
    </div>
  );
}
