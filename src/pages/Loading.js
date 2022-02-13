import { Backdrop } from '@mui/material'
import React from 'react'

const Loading = () => {
  return (
    <Backdrop open sx={{ zIndex: 99999999 }}>
        <img src={require('../assets/images/loader.gif')} />
    </Backdrop>
  )
}

export default Loading