import React from 'react'
import classes from './Header.module.css'
import AuthContext from '../store/authContext'
import { useContext } from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  const authCtx = useContext(AuthContext)

  const styleActiveLink = ({ isActive }) => {
    return {
        color: isActive ? '#f57145' : ''
    }
}
  return (
    <div className={classes.header}>
      {
          authCtx.token && (
              <ul className='main-nav'>
                  <li classname={classes.listItem}>
                      <NavLink style={styleActiveLink} to='/' classname={classes.listItem}>Home</NavLink>
                  </li>
                  <li classname={classes.listItem}>
                      <NavLink style={styleActiveLink} to='profile' classname={classes.listItem}>Profile</NavLink>
                  </li>
                  <li classname={classes.listItem}>
                      <NavLink style={styleActiveLink} to='form' classname={classes.listItem}>Add Post</NavLink>
                  </li>
                  <li classname={classes.listItem}>
                      <button className='logout-btn' onClick={() => authCtx.logout()}>Logout</button>
                  </li>
              </ul>
          ) 
      }
  </div>
  )
}

export default Header