import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import CardNotQr from "../component/card_not_qr.tsx";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary
}));

export default function CardList(props: any) {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid xs={5} md={5} sx={{ flexGrow: 1 }}>
          <CardNotQr />
        </Grid>
        <Grid xs={5} md={5} sx={{ flexGrow: 1 }}>
          <CardNotQr />
        </Grid>
      </Grid>
    </div>
  )
}
