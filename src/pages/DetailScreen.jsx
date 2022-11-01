import React, {useState, useEffect, useCallback} from 'react'
import classes from '../styling/DetailScreen.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import DetailContainer from '../components/DetailContainer'


const DetailScreen = () => {
    const {id} = useParams()

    const [vehicle, setVehicle] = useState([])

    const getVehicleDetails = useCallback(() => {
        axios.get(`http://localhost:3000/vehicle/${id}`)
        .then(res => {
            setVehicle(res.data)
            console.log(res.data)
        })
        .catch(err => console.log(err))
      }, [id])
    

    useEffect(() => {
        getVehicleDetails()
        console.log('this vehicle',vehicle[0])
    }, [getVehicleDetails])

    const mappedVehicle = vehicle.map((vehicle, index) => {
        return (
            <DetailContainer vehicle = {vehicle} />
        )
    })
  return (
    
    <div className={classes.detailScreen}>{mappedVehicle}</div>
  )
}

export default DetailScreen