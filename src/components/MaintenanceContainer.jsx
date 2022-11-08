import React, {useState} from 'react'
import classes from './MaintenanceContainer.module.css'
import axios from 'axios'
import {HiPencilSquare} from 'react-icons/hi2'

const MaintenanceContainer = ({maintenance, index, toggleDark}) => {
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
    toggleDark()
  }

  const toggleAreYaSure = () => {
    setAreYaSure(current => !current)
    toggleEditing()
    toggleDark()
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
        <div className={classes.doubleCheck}>
          <h2 className={classes.question}>Are you sure you want to delete?</h2>
          <p className={classes.comment}>This action cannot be undone</p>
          <div><button onClick={deleteHandler} className={classes.deleteButton}>Yes</button>
          <button onClick={toggleAreYaSure} className={classes.noButton}>No</button></div>
          
        </div>
      )}

     {editing && ( 
      <div className={classes.maintenanceEditContain}>
        <h1 onClick={toggleEditing} className={classes.x}>X</h1>
        <h1>Edit</h1>
        <form onSubmit={submitHandler}>
          <div>
            <label htmlFor='service'>Service</label>
            <input 
              name='service'
              placeholder='Service'
              value={service}
              onChange={e => setService(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="date">Date</label>
            <input 
              name='date'
              placeholder='Date'
              value={date}
              onChange={e => setDate(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="odometer">Odometer</label>
            <input 
              name='odometer' 
              placeholder='Odometer'
              value={odometer}
              onChange={e => setOdometer(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="notes">Notes</label>
            <textarea 
              className={classes.textarea} 
              name='notes'
              placeholder='Notes'
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />
          </div>
          <button type="submit" className={classes.saveChanges}>Save Changes</button>
        </form>
        <button onClick={toggleAreYaSure} className={classes.deleteButton}>Delete Item</button>
      </div>)}

      <div className={classes.maintenanceCard}>
        <div className={classes.maintenceCardBuffer}>
        <HiPencilSquare  className={classes.edit} onClick={toggleEditing}/>
        </div>
        <div className={classes.maintenanceText}>
          <h1>{maintenance.service}</h1>
          <h2>{maintenance.date}</h2>
          <h2>{maintenance.odometer}</h2>
          <h2>{maintenance.notes}</h2>
        </div>
        
      </div>
       
        
    </div>
  )
}

export default MaintenanceContainer