import { useState } from "react";
import { useForm } from "react-hook-form";
import { FilledInput, FormGroup, Button } from "@mui/material";
import { Prop } from "./Register";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const CREATE_CONTACT = gql`
  mutation createContact($input: CreateContactInput!) {
    createContact(input: $input) {
      name
      address
      email
      phone
    }
  }
`;

export default function CreateContact({ onChangeState }: Prop) {
  const {
    register,
    formState: { errors },
  } = useForm();

  const [state, setFormState] = useState({
    email: "",
    phone: "",
    address: "",
    name: "",
  });

  const [createContact] = useMutation(CREATE_CONTACT);

  const onChangeInputs = (e: any) => {
    setFormState({ ...state, [e.target.name]: e.target.value });
  };

  const onCliLogin = () => {
    createContact({ variables: { input: { ...state } } });
    setFormState({ email: "", phone: "", address: "", name: "" });
  };

  return (
    <div style={{ width: "800px", margin: "auto" }}>
      <FormGroup>
        {/* include validation with required or other standard HTML validation rules */}
        <FilledInput
          value={state.name}
          placeholder="name"
          aria-label="name"
          {...register("name", { required: true })}
          onChange={onChangeInputs}
          name="name"
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
          value={state.phone}
          placeholder="phone"
          aria-label="phone"
          {...register("phone", { required: true })}
          onChange={onChangeInputs}
          name="phone"
        />
        <FilledInput
          value={state.address}
          placeholder="address"
          aria-label="address"
          {...register("address", { required: true })}
          onChange={onChangeInputs}
          name="address"
        />

        {errors.exampleRequired && <span>This field is required</span>}
        <Button onClick={onCliLogin} variant="contained" disableElevation>
          Create Contact
        </Button>
      </FormGroup>
    </div>
  );
}
