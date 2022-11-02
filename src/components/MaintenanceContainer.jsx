import React from 'react'
import classes from './MaintenanceContainer.module.css'

const MaintenanceContainer = ({maintenance}) => {
  return (
    <div className={classes.maintenanceContainer}>
        <h1>{maintenance.service}</h1>
        <h2>{maintenance.date}</h2>
        <h2>{maintenance.odometer}</h2>
        <h2>{maintenance.notes}</h2>
        <button>Edit</button>
    </div>
  )
}

export default MaintenanceContainer