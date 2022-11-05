import React from 'react'
import NewVehicle from '../forms/NewVehicle'
import { useContext, useEffect, useState, useCallback } from 'react'
import AuthContext from '../store/authContext'
import axios from 'axios'
import classes from '../styling/Home.module.css'
import VehicleCard from '../components/VehicleCard'

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
  }, [getVehicles])

  const mappedVehicles = allVehicles.map((vehicle, index) => {
    return (
      <VehicleCard vehicle={vehicle}/>
    )
  })

 
  return (
    <div className={classes.home}>
      
      <NewVehicle getVehicles={getVehicles} />
      {mappedVehicles}
    </div>
  )
}

export default Home