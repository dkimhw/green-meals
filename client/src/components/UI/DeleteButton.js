import { Fragment } from "react";
import { Button } from "@mui/material";

export const DeleteButton = () => {
  return (
    <Fragment>
      <Button
        variant="outlined"
        type="submit"
        sx={{
          mt: '.5rem',
          color: '#FF2171',
          borderColor: "#FF2171",
          width: '5.5rem',
        }}
      >
        Delete
      </Button>
    </Fragment>
  )
};
