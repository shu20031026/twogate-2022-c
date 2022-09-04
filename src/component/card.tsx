import QRCode from 'qrcode.react'

import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'

import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Unstable_Grid2'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

export default function Card() {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          xs={8}
          md={8}
          lg={8}
          spacing={4}
          sx={{ justifyContent: 'center', m: '0 auto' }}
        >
          <Grid xs={4} sx={{ flexGrow: 1 }}>
            <Item>
              <Box
                id="category-a"
                sx={{ fontSize: '12px', textTransform: 'uppercase' }}
              ></Box>
              <Box
                component="ul"
                aria-labelledby="category-a"
                sx={{ pl: 2, flex: 1, textAlign: 'left' }}
              >
                <p>名前</p>
                <p>イベント</p>
                <p>一言</p>
              </Box>
            </Item>
          </Grid>
          <Grid>
            <QRCode value="https://google.com" />
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}
