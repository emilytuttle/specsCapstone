import React, {useState} from 'react'
import classes from './MaintenanceContainer.module.css'
import axios from 'axios'

const MaintenanceContainer = ({maintenance, index}) => {
  const maintenanceId = `${maintenance.id}`
  const url = 'http://localhost:3000'

  const [editing, setEditing] = useState(false)
  const [areYaSure, setAreYaSure] = useState(false)
  const [service, setService] = useState(`${maintenance.service}`)
  const [date, setDate] = useState(`${maintenance.date}`)
  const [odometer, setOdometer] = useState(`${maintenance.odometer}`)
  const [notes, setNotes] = useState(`${maintenance.notes}`)

  const toggleEditing = () => {
    setEditing(current => !current)
  }

  const toggleAreYaSure = () => {
    setAreYaSure(current => !current)
  }

  const deleteHandler = () => {
    axios.delete(`${url}/deletemaintenance/${maintenanceId}`)
    .then(() => console.log('deleted'))
    .catch(err => console.log(err))
  }

  const submitHandler = (e) => {
    e.preventDefault()

    const body = {
      service,
      date,
      odometer,
      notes,
      maintenanceId
    }
    axios.put(`${url}/editmaintenance`, body)
    .then((res) => {
      toggleEditing()
      console.log(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (

    <div className={classes.maintenanceContainer}>
      {areYaSure && (
        <div>
          Are you sure? All data will be deleted and cannot be undone.
          <button onClick={deleteHandler}>Yes</button>
          <button onClick={toggleAreYaSure}>No</button>
        </div>
      )}

     {editing && ( 
      <div>
        <h1 onClick={toggleEditing}>X</h1>
        <form onSubmit={submitHandler}>
            <input 
              placeholder='Service'
              value={service}
              onChange={e => setService(e.target.value)}
            />

            <input 
              placeholder='Date'
              value={date}
              onChange={e => setDate(e.target.value)}
            />
             <input 
              placeholder='Odometer'
              value={odometer}
              onChange={e => setOdometer(e.target.value)}
            />
             <input 
              placeholder='Notes'
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />
            <button type="submit">Submit</button>
        </form>
        <button onClick={toggleAreYaSure}>Delete Item</button>
      </div>)}

        <h1>{maintenance.service}</h1>
        <h2>{maintenance.date}</h2>
        <h2>{maintenance.odometer}</h2>
        <h2>{maintenance.notes}</h2>
        <button onClick={toggleEditing}>Edit</button>
        
    </div>
  )
}

export default MaintenanceContainer