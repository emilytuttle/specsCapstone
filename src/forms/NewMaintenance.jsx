import React, {useState} from 'react'
import axios from 'axios'
import classes from './NewMaintenance.module.css'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";


const NewMaintenance = ({id, toggleMaint, getMaintenanceDetails}) => {
    const [service, setService] = useState('')
    const [odometer, setOdometer] = useState('')
    const [notes, setNotes] = useState('')

    const [startDate, setStartDate] = useState(new Date());

    const submitHandler = e => {
        e.preventDefault()
        let newStartDate = startDate.toString()
        const body = {
            service,
            newStartDate,
            odometer,
            notes, 
            id
        }

        const url = 'http://localhost:3000'
                            
        axios.post(`${url}/createMaintenace`, body)
        .then((res) => {
            console.log(res.data)
        }).catch(err => console.log(err))
        getMaintenanceDetails()
        toggleMaint()
        console.log(startDate)
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
             {/* <input 
                placeholder='Date'
                value={date}
                onChange={e => setDate(e.target.value)}
            /> */}
            <DatePicker selected={startDate} onChange={(e) => setStartDate(e)} />
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