import { Button } from "@mui/material";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

const DELETE_CONTACT = gql`
  mutation deleteContact($input: GetContactInput!) {
    deleteContact(input: $input)
  }
`;

export default function Delete({ contactId }: any) {
  const [deleteContact] = useMutation(DELETE_CONTACT);
  return (
    <Button
      onClick={() => deleteContact({ variables: { input: { contactId } } })}
      variant="outlined"
      size="small"
      color="error"
    >
      del
    </Button>
  );
}
