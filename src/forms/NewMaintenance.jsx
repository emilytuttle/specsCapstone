import React, {useState} from 'react'
import axios from 'axios'
import classes from './NewMaintenance.module.css'


const NewMaintenance = ({id, toggleMaint}) => {
    const [service, setService] = useState('')
    const [date, setDate] = useState('')
    const [odometer, setOdometer] = useState('')
    const [notes, setNotes] = useState('')

    const submitHandler = e => {
        e.preventDefault()

        const body = {
            service,
            date,
            odometer,
            notes, 
            id
        }

        const url = 'http://localhost:3000'
                            
        axios.post(`${url}/createMaintenace`, body)
        .then((res) => {
            console.log(res.data)
            setService('')
            setDate('')
            setOdometer('')
            setNotes('')
        }).catch(err => console.log(err))
    }

  return (
    <div className={classes.newMaint}>
        <div className={classes.x} onClick={toggleMaint}>X</div>
        <h1>Add Maintenance Item</h1>
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
             <textarea 
                className={classes.textarea}
                placeholder='Notes'
                value={notes}
                onChange={e => setNotes(e.target.value)}
            />
            <button type="submit" className={classes.add}>Submit</button>
        </form>
    </div>
  )
}

export default NewMaintenance