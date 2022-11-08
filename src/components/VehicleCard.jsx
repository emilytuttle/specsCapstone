import React from 'react'
import { useNavigate } from 'react-router-dom'
import classes from './VehicleCard.module.css'


const VehicleCard = ({vehicle}) => {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/vehicle/${vehicle.id}`)
      }
    
  return (
    <div key={vehicle.id} className={classes.carCard}>
        <h1 className={classes.text1}>{vehicle.year} {vehicle.make} {vehicle.model}</h1>
        <h2 className={classes.text}>{vehicle.license}</h2>


        <button onClick={handleClick} className={classes.viewDetails}>View Details</button>
    </div>
  )
}

export default VehicleCard