import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import React from 'react'

export function CircularIndeterminate () {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  )
}
