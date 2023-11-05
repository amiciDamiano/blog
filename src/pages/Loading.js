import { CloseTwoTone } from '@mui/icons-material'
import { Backdrop, IconButton } from '@mui/material'
import React, { useState } from 'react'

const Loading = () => {

  const [display, setDisplay] = useState("flex");

  const handleCloseLoading = () => {
    setDisplay("none");
  };

  return (<>
    <Backdrop open sx={{ display, zIndex: 99999999 }}>
      <IconButton onClick={handleCloseLoading} size="small" sx={{ position: "fixed", top: 20, right: 20 }}>
        <CloseTwoTone fontSize="small" />
      </IconButton>
      <img alt="..." src={require('../assets/images/loader.gif')} />
    </Backdrop>
  </>
  )
}

export default Loading