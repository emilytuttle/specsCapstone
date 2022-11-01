import React from 'react'
import classes from './DetailContainer.module.css'
import NewMaintenance from '../forms/NewMaintenance'
import { useNavigate } from 'react-router-dom'

const DetailContainer = ({vehicle}) => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(`/home`)
    }
  return (
    <div className={classes.carCard}>
        <button onClick={handleClick}>Back</button>
        <h1>{vehicle.name}</h1>
        <h2>{vehicle.year} {vehicle.make} {vehicle.model}</h2>
        <h2>{vehicle.license}</h2>
        <NewMaintenance id={vehicle.id}/>
    </div>
  )
}

export default DetailContainer