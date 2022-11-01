import React, {useState} from 'react'
import axios from 'axios'


const NewMaintenance = () => {
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
            notes
        }

        axios.post(`http://localhost:3000/createMaintenance`, body)
        .then((res) => {
            console.log(res.data)
            setService('')
            setDate('')
            setOdometer('')
            setNotes('')
        })
        .catch(err => console.log(err))
    }

  return (
    <div>
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
    </div>
  )
}

export default NewMaintenance