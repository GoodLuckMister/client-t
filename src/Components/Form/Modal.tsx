import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { FormGroup, FilledInput } from "@mui/material";
import Modal from "@mui/material/Modal";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const UPDATE_CONTACT = gql`
  mutation updateContact($input: UpdateContactInput!) {
    updateContact(input: $input) {
      name
      email
      address
      phone
    }
  }
`;

export default function BasicModal({ row }: any) {
  const {
    register,
    formState: { errors },
  } = useForm();

  const [open, setOpen] = React.useState(false);
  const [rowState, setState] = React.useState({
    name: row.name,
    email: row.email,
    address: row.address,
    phone: row.phone,
  });

  const handleOpen = () => {
    setOpen(true);
    setState({
      name: row.name,
      email: row.email,
      address: row.address,
      phone: row.phone,
    });
  };
  const handleClose = () => {
    setOpen(false);
    setState({ name: "", email: "", address: "", phone: "" });
  };

  const [updateContact] = useMutation(UPDATE_CONTACT);
  const onChangeInputs = (e: any) => {
    setState({ ...rowState, [e.target.name]: e.target.value });
  };

  const onClickEdit = () => {
    updateContact({
      variables: {
        input: {
          name: rowState.name,
          address: rowState.address,
          phone: rowState.phone,
          email: rowState.email,
          contactId: row.id,
        },
      },
    });
    handleClose();
  };

  return (
    <>
      <Button variant="contained" size="small" onClick={handleOpen}>
        Edit
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormGroup>
            <FilledInput
              value={rowState.name}
              placeholder="name"
              aria-label="name"
              {...register("name", { required: true })}
              onChange={onChangeInputs}
              name="name"
            />
            <FilledInput
              value={rowState.phone}
              placeholder="phone"
              aria-label="phone"
              {...register("phone", { required: true })}
              onChange={onChangeInputs}
              name="phone"
            />
            <FilledInput
              value={rowState.email}
              placeholder="email"
              aria-label="email"
              {...register("email", { required: true })}
              onChange={onChangeInputs}
              name="email"
            />
            <FilledInput
              value={rowState.address}
              placeholder="address"
              aria-label="address"
              {...register("address", { required: true })}
              onChange={onChangeInputs}
              name="address"
            />

            {errors.exampleRequired && <span>This field is required</span>}
            <Button onClick={onClickEdit} variant="contained" disableElevation>
              Update
            </Button>
          </FormGroup>
        </Box>
      </Modal>
    </>
  );
}
