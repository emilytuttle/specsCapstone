import React from 'react'
import classes from './Header.module.css'
import AuthContext from '../store/authContext'
import { useContext } from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  const authCtx = useContext(AuthContext)

  const styleActiveLink = ({ isActive }) => {
    return {
        color: isActive ? '#012F51' : ''
    }
}
  return (
    <div className={classes.header}>
        
      {
          authCtx.token && (
              <ul className={classes.navBar}>
                  <li classname={classes.listItem}>
                      <NavLink style={styleActiveLink} to='/' >My Garage</NavLink>
                  </li>
                  <li classname={classes.listItem}>
                      <button className={classes.logoutButton} onClick={() => authCtx.logout()}>Logout</button>
                  </li>
              </ul>
          ) 
      }
  </div>
  )
}

export default Header