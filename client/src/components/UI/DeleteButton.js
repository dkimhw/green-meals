import { Button } from "@mui/material";

export const DeleteButton = (props) => {
  return (
    <Button
      variant="outlined"
      type="submit"
      sx={{
        mt: '.5rem',
        color: '#FF2171',
        borderColor: "#FF2171",
        width: '5.5rem',
        transition: '.5s all',
        "&:hover": {
          border: "1px solid #FF2171",
          transform: 'scale(1.05)'
        },
      }}
      onClick={props.onClick}
    >
      Delete
    </Button>
  )
};
