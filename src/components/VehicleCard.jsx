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
        <h2>{vehicle.name}</h2>
        <h4>{vehicle.make} {vehicle.model}</h4>
        <h4>{vehicle.year}</h4>
        <button onClick={handleClick}>View Details</button>
    </div>
  )
}

export default VehicleCard