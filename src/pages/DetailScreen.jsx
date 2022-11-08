import React, {useState, useEffect, useCallback} from 'react'
import classes from '../styling/DetailScreen.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import DetailContainer from '../components/DetailContainer'
import MaintenanceContainer from '../components/MaintenanceContainer'
import { useNavigate } from 'react-router-dom'



const DetailScreen = () => {

  const navigate = useNavigate()
    const handleClick = () => {
        navigate(`/home`)
    }
    const {id} = useParams()

    const [vehicle, setVehicle] = useState([])
    const [maintenanceItems, setMaintenanceItems] = useState([])
    const [darkScreen, setDarkScreen] = useState(false)
    const [areYaSure, setAreYaSure] = useState(false)

    const toggleDark = () => {
      setDarkScreen(current => !current)
    }

    const toggleAreYaSure = () => {
      setAreYaSure(current => !current)
      toggleDark()
    }

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
            <DetailContainer 
              vehicle = {vehicle} 
              key={index} 
              toggleDark={toggleDark} 
              getMaintenanceDetails={getMaintenanceDetails}
            />
        )
    })

    const mappedMaintenance = maintenanceItems.map((maintenance, index) => {
      return (
        <MaintenanceContainer 
          maintenance={maintenance} 
          index={index} 
          toggleDark={toggleDark}
        />
      )
    })

    
  return (
    
    <div className={classes.detailScreen}>
      <button className={classes.deleteVehicle} onClick={toggleAreYaSure}>Delete Vehicle</button>
      {darkScreen && (<div className={classes.darkout} onClick={toggleDark}>Are you there</div>)}
      <button onClick={handleClick} className={classes.button}>Back</button>
      <div>
        {mappedVehicle}
        {mappedMaintenance}
      </div>
      
    </div>
  )
}

export default DetailScreen