import Grid from '@mui/material/Unstable_Grid2'
import CardNotQr from '../component/card_not_qr'

export default function CardList() {
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
