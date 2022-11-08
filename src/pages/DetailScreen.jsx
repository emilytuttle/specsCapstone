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

    const deleteHandler = () => {
      axios.delete(`http://localhost:3000/deletevehicle/${id}`)
      .then(() => {
        console.log('deleted vehicle')
        navigate(`/home`)
      })
      .catch(err => console.log(err))
    }

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
      {darkScreen && (<div className={classes.darkout} onClick={toggleDark}></div>)}
      {areYaSure && (
        <div className={classes.doubleCheck}>
          <h2 className={classes.question}>Are you sure you want to delete?</h2>
          <p className={classes.comment}>This action cannot be undone</p>
          <div><button className={classes.deleteButton} onClick={deleteHandler}>Yes</button>
          <button onClick={toggleAreYaSure} className={classes.noButton}>No</button></div>
          
        </div>
      )}
      <button onClick={handleClick} className={classes.button}>Back</button>
      <div>
        {mappedVehicle}
        {mappedMaintenance}
      </div>
      
    </div>
  )
}

export default DetailScreen