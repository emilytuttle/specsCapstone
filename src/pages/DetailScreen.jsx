import React, {useState, useEffect, useCallback} from 'react'
import classes from '../styling/DetailScreen.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import DetailContainer from '../components/DetailContainer'
import MaintenanceContainer from '../components/MaintenanceContainer'



const DetailScreen = () => {
    const {id} = useParams()

    const [vehicle, setVehicle] = useState([])
    const [maintenanceItems, setMaintenanceItems] = useState([])

    const getVehicleDetails = useCallback(() => {
        axios.get(`http://localhost:3000/vehicle/${id}`)
        .then(res => {
            setVehicle(res.data)
            console.log(res.data)
        })
        .catch(err => console.log(err))
      }, [id])

    const getMaintenanceDetails = useCallback(() => {
      axios.get(`http://localhost:3000/maintenance/${id}`)
      .then(res => {
        setMaintenanceItems(res.data)
      })
      .catch(err => console.log(err))
    }, [id])
    

    useEffect(() => {
        getVehicleDetails()
        getMaintenanceDetails()
        console.log('this vehicle',vehicle[0])
    }, [getVehicleDetails, getMaintenanceDetails])

    const mappedVehicle = vehicle.map((vehicle, index) => {
        return (
            <DetailContainer vehicle = {vehicle} key={index}/>
        )
    })

    const mappedMaintenance = maintenanceItems.map((maintenance, index) => {
      return (
        <MaintenanceContainer maintenance={maintenance} key={index} />
      )
    })
  return (
    
    <div className={classes.detailScreen}>
      {mappedVehicle}
      {mappedMaintenance}
    </div>
  )
}

export default DetailScreen