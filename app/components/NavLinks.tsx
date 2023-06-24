import React from 'react'
import Link from '@mui/material/Link'

export function NavLinks (props: { text: string }) {
  return (
    <div className="navText">
      <Link underline="hover" color="inherit" href="/" sx={{ marginRight: 2 }}>
        <span className={props.text === 'Home' ? 'bold' : ''}>Home</span>
      </Link>
      <Link underline="hover" color="inherit" href="/about">
        <span className={props.text === 'About' ? 'bold' : ''}>About</span>
      </Link>
    </div>
  )
}
