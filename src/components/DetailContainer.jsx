import React, {useState, useEffect} from 'react'
import classes from './DetailContainer.module.css'
import NewMaintenance from '../forms/NewMaintenance'
import axios from 'axios'
import {HiPencilSquare} from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'

const DetailContainer = ({vehicle, toggleDark, getVehicleDetails, getMaintenanceDetails} ) => {
  const [make, setMake] = useState(`${vehicle.make}`)
  const [model, setModel] = useState(`${vehicle.model}`)
  const [year, setYear] = useState(`${vehicle.year}`)
  const [license, setLicense] = useState(`${vehicle.license}`)

  const navigate = useNavigate()

  const vehicleId = `${vehicle.id}`

  const [editing, setEditing] = useState(false)
  const [addNew, setAddNew] = useState(false)

  const [areYaSure, setAreYaSure] = useState(false)

  const toggleAreYaSure = () => {
    
    setEditing(current => !current);
    setAreYaSure(current => !current)
   
  }
    

    const toggleEditing = () => {
      setEditing(current => !current);
      toggleDark()

    }
//USE THESE
    const openEditingAndDark = () => {
      setEditing(current => !current)
      toggleDark()
      setAreYaSure(false)
    }

    const openEditingOnly = () => {
      setEditing(current => !current)
    }

    const openAreYaSure = () => {
      setAreYaSure(current => !current)
    }

    const openAndClose = () => {
      openAreYaSure()
      openEditingOnly()
    }

    const tryAgain = () => {
      setEditing(false)
    }




    const toggleMaint = () => {
      setAddNew(current => !current)
      toggleDark()
    }

    const editHandler = (e) => {
      e.preventDefault()
      

      const body = {
        make,
        model,
        year,
        license,
        vehicleId
      }

      const url = 'http://localhost:3000'

      axios.put(`${url}/editvehicle`, body)
      .then((res) => {
        console.log(res.data)
        toggleEditing()
        getVehicleDetails()
      })
      .catch(err => {
        console.log(err)
      })
      toggleEditing()
      getVehicleDetails()
    }

    const deleteHandler = () => {
      axios.delete(`http://localhost:3000/deletevehicle/${vehicleId}`)
      .then(() => {
        console.log('deleted vehicle')
        navigate(`/home`)
      })
      .catch(err => console.log(err))
    }

  return (
    <div className={classes.detailContainer}>

        {editing && (
          <div className={classes.editCar}>
            <h1 onClick={toggleEditing} className={classes.x}>X</h1>
            <h1>Edit Vehicle</h1>
            <div className={classes.formContain}>
              <form onSubmit={editHandler}>
                
                <div className={classes.labelsInputs}>
                  <label>Make</label>
                  <input 
                    placeholder='Make'
                    value={make} 
                    onChange={e => setMake(e.target.value)}
                  />
                </div>
                
                <div className={classes.labelsInputs}>
                  <label>Model</label>
                  <input
                    placeholder='Model' 
                    value={model}
                    onChange={e => setModel(e.target.value)}
                  />
                </div>
                  
                <div className={classes.labelsInputs}>
                <label>Year</label>
                  <input 
                    placeholder='Year' 
                    value={year}
                    onChange={e => setYear(e.target.value)}
                  />
                </div>
                
                <div className={classes.labelsInputs}>
                <label>License Plate</label>
                  <input 
                    placeholder='License Plate' 
                    value={license}
                    onChange={e => setLicense(e.target.value)}
                  />
                </div>
               
                <button type="submit" className={classes.submit}>Submit</button>
              </form>

              <button className={classes.deleteVehicle} onClick={openAreYaSure}>Delete Vehicle</button>
      
      {areYaSure && (
        <div className={classes.doubleCheck}>
          <h2 className={classes.question}>Are you sure you want to delete?</h2>
          <p className={classes.comment}>This action cannot be undone</p>
          <div><button className={classes.deleteButton} onClick={deleteHandler}>Yes</button>
          <button onClick={openAreYaSure} className={classes.noButton}>No</button></div>
          
        </div>
      )}
            </div>
          </div>
        )}

        <div className={classes.container}>
        <div className={classes.carCard}>
          <HiPencilSquare  className={classes.edit} onClick={openEditingAndDark}/>
          <div className={classes.cardWords}>
            <h1 className={classes.title}>{vehicle.year} {vehicle.make} {vehicle.model}</h1>
            <h2>{vehicle.license}</h2>
          
          </div>
        </div>
       
          
        </div>
        <div className={classes.maintenances}>
          <div className={classes.maintenanceAdd} onClick={toggleMaint}>Add Maintenance Item</div>
          {addNew && (<NewMaintenance id={vehicle.id} toggleMaint={toggleMaint} getMaintenanceDetails={getMaintenanceDetails}/>)}
        </div>
       
    </div>
  )
}

export default DetailContainer