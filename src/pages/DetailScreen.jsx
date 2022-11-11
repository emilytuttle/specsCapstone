import React, {useState, useEffect, useCallback} from 'react'
import classes from '../styling/DetailScreen.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import DetailContainer from '../components/DetailContainer'
import MaintenanceContainer from '../components/MaintenanceContainer'
import { useNavigate } from 'react-router-dom'
import MaintenanceTable from '../components/MaintenanceTable'
import { IoMdSearch } from "react-icons/io";



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
    const [search, setSearch] = useState('')

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
              getVehicleDetails={getVehicleDetails}
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
          getVehicleDetails={getMaintenanceDetails}
          maintenanceItems={maintenanceItems}
        />
      )
    })

    const secondMappedMaintenace = maintenanceItems.filter((maintenance, index) => {
      let name = maintenance.service.toLowerCase()
      let date = maintenance.date.toLowerCase()
      let odometerSearch = maintenance.odometer.toLowerCase()
      let notesSearch = maintenance.notes.toLowerCase()
      let searchParams = search.toLowerCase()
      return (
        name.includes(searchParams)
      )
  }).map((maintenance, index) => {
      return (
        <MaintenanceTable 
          maintenance={maintenance} 
          index={index} 
          toggleDark={toggleDark}
          getMaintenanceDetails={getMaintenanceDetails}
        />
        
      )
    })

   

    
  return (
    
    <div className={classes.detailScreen}>
      {darkScreen && (<div className={classes.darkout} onClick={toggleDark}></div>)}
      
      <button onClick={handleClick} className={classes.button}>Back</button>
      <div className={classes.center}>
        {mappedVehicle}

        <input 
          className={classes.searchBar} 
          placeholder='Search by Service'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <table className={classes.table}>
          <tr className={classes.tableHeader}>
            <th className={classes.serviceColumn}>Service</th>
            <th className={classes.dateColumn}>Date</th>
            <th className={classes.odometerColumn}>Odometer</th>
            <th className={classes.notesColumn}>Notes</th>
            <th className={classes.end}></th>
           

          </tr>
          {secondMappedMaintenace}
        </table>
      </div>
      
    </div>
  )
}

export default DetailScreen