import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

const BasicTextFields = () => {
  return (
    <>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label="名前" variant="outlined" />
        <br />
        <TextField
          id="outlined-basic"
          label="イベントタグ"
          variant="outlined"
        />
        <br />
        <TextField id="outlined-basic" label="グループ名" variant="outlined" />
        <br />
        <TextField
          id="outlined-basic"
          label="プロダクトURL"
          variant="outlined"
        />
        <br />
        <TextField
          id="outlined-basic"
          label="プロダクトURL"
          variant="outlined"
        />
      </Box>
    </>
  )
}

export default BasicTextFields
