import React, {useState} from 'react'
import classes from './DetailContainer.module.css'
import NewMaintenance from '../forms/NewMaintenance'
import axios from 'axios'
import {HiPencilSquare} from 'react-icons/hi2'

const DetailContainer = ({vehicle, toggleDark, getMaintenanceDetails} ) => {
  const [make, setMake] = useState(`${vehicle.make}`)
  const [model, setModel] = useState(`${vehicle.model}`)
  const [year, setYear] = useState(`${vehicle.year}`)
  const [license, setLicense] = useState(`${vehicle.license}`)

  const vehicleId = `${vehicle.id}`

  const [editing, setEditing] = useState(false)
  const [addNew, setAddNew] = useState(false)
    

    const toggleEditing = () => {
      setEditing(current => !current);
      toggleDark()

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
        getMaintenanceDetails()
      })
      .catch(err => {
        console.log(err)
      })


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
            </div>
          </div>
        )}

        <div className={classes.container}>
        <div className={classes.carCard}>
          <HiPencilSquare  className={classes.edit} onClick={toggleEditing}/>
          <div className={classes.cardWords}>
            <h1 className={classes.title}>{vehicle.year} {vehicle.make} {vehicle.model}</h1>
            <h2>{vehicle.license}</h2>
          
          </div>
        </div>
       
          
        </div>
        <div className={classes.maintenances}>
          <div className={classes.maintenanceAdd} onClick={toggleMaint}>Add Maintenance Item</div>
          {addNew && (<NewMaintenance id={vehicle.id} toggleMaint={toggleMaint}/>)}
        </div>
       
    </div>
  )
}

export default DetailContainer