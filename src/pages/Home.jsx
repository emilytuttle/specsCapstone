import React from 'react'
import NewVehicle from '../forms/NewVehicle'
import { useContext, useEffect, useState, useCallback } from 'react'
import AuthContext from '../store/authContext'
import axios from 'axios'
import classes from '../styling/Home.module.css'

const Home = () => {
  const {userId} = useContext(AuthContext)

  const [allVehicles, setAllVehicles] = useState([])

  const getVehicles = useCallback(() => {
    axios.get(`http://localhost:3000/uservehicles/${userId}`)
    .then(res => setAllVehicles(res.data))
    .catch(err => console.log(err))
  }, [userId])

  useEffect(() => {
    getVehicles()
  }, [])

  const mappedVehicles = allVehicles.map(vehicle => {
    return (
      <div key={vehicle.id} >
        <h2>{vehicle.name}</h2>
        <h4>{vehicle.make} {vehicle.model}</h4>
        <h4>{vehicle.year}</h4>
      </div>
    )
  })

  return (
    <div>Home
      <NewVehicle />
      {mappedVehicles}
    </div>
  )
}

export default Home