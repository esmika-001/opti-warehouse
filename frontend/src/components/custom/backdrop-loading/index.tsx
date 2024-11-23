import { Backdrop, CircularProgress } from '@mui/material'
import React from 'react'

const CustomLoader = () => {
  return (
    <Backdrop open={true} sx={{ zIndex: 9999, backgroundColor:"#1f1f1f70" }}>
      <CircularProgress sx={{color:"white"}} />
    </Backdrop>
  )
}

export default CustomLoader
