import React from 'react'
import Link from '@mui/material/Link'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'

export function NavLinks(props: { text: string }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <div className="navText">
          <Link underline="hover" color="inherit" href="/" sx={{ marginRight: 2 }}>
            <span className={props.text === 'Home' ? 'bold' : ''}>Home</span>
          </Link>
          <Link underline="hover" color="inherit" href="/about">
            <span className={props.text === 'About' ? 'bold' : ''}>About</span>
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  )
}
