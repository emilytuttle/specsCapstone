import React, {useState, useEffect} from 'react'
import {HiPencilSquare} from 'react-icons/hi2'
import classes from './MaintenanceTable.module.css'
import axios from 'axios'


const MaintenanceTable = ({maintenance, toggleDark, getMaintenanceDetails, index}) => {
    const maintenanceId = `${maintenance.id}`
    const url = 'http://localhost:3000'

    const fixedDate = `${maintenance.date}`
    const doubleFixed = fixedDate.slice(0,15)

    const [even, setEven] = useState(false)

    useEffect(() => {
        if (index % 2 === 0) {
            setEven(true)
        }
    }, [index])

    //editing & delete useStates
    const [editing, setEditing] = useState(false)
    const [areYaSure, setAreYaSure] = useState(false)
    const [service, setService] = useState(`${maintenance.service}`)
    const [date, setDate] = useState(doubleFixed)
    const [odometer, setOdometer] = useState(`${maintenance.odometer}`)
    const [notes, setNotes] = useState(`${maintenance.notes}`)

    const toggleEditing = () => {
        setEditing(current => !current)
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

        toggleEditing()
        toggleAreYaSure()
        getMaintenanceDetails()
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
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
        toggleEditing()
        getMaintenanceDetails()
    }
  return (
    <tr className={!even && classes.rowBlue}>
        {!editing && (
            <>
            <td className={classes.serviceColumn}>{maintenance.service}</td>
            <td className={classes.dateColumn}>{doubleFixed}</td>
            <td className={classes.odometerColumn}>{maintenance.odometer}</td>
            <td className={classes.notesColumn}>{maintenance.notes}</td>
            <td className={classes.editColumn}><HiPencilSquare  className={classes.edit} onClick={toggleEditing}/></td>
            </>
        )}
        {areYaSure && (
            <td className={classes.doubleCheck}>
            <h2 className={classes.question}>Are you sure you want to delete?</h2>
            <p className={classes.comment}>This action cannot be undone</p>
            <div><button onClick={deleteHandler} className={classes.deleteButton}>Yes</button>
            <button onClick={toggleAreYaSure} className={classes.noButton}>No</button></div>
            </td>
        )}

    {editing && ( 
        <td >
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
                <button onClick={deleteHandler} className={classes.deleteButton}>Delete Item</button>
            </div>
        </td>
    )}
        
    </tr>
  )
}

export default MaintenanceTable