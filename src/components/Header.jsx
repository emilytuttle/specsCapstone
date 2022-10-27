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
                  <li>
                      <NavLink style={styleActiveLink} to='/'>Home</NavLink>
                  </li>
                  <li>
                      <NavLink style={styleActiveLink} to='profile'>Profile</NavLink>
                  </li>
                  <li>
                      <NavLink style={styleActiveLink} to='form'>Add Post</NavLink>
                  </li>
                  <li>
                      <button className='logout-btn' onClick={() => authCtx.logout()}>Logout</button>
                  </li>
              </ul>
          ) 
      }
  </div>
  )
}

export default Header