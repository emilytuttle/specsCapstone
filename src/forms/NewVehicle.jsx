import React from 'react'
import { useState, useContext } from 'react'
import axios from 'axios'
import AuthContext from '../store/authContext'


const NewVehicle = () => {
    const {userId} = useContext(AuthContext)

    const [name, setName] = useState('')
    const [make, setMake] = useState('')
    const [model, setModel] = useState('')
    const [year, setYear] = useState('')
    const [license, setLicense] = useState('')
    const [odometer, setOdometer] = useState('')

    const submitHandler = e => {
        e.preventDefault()

        const body = {
            name,
            make,
            model,
            year,
            license,
            odometer,
            userId
        }

        const url = 'http://localhost:3000'

        axios.post(`${url}/createVehicle`, body)
        .then((res) => {
            console.log(res.data)
            setName('')
            setMake('')
            setModel('')
            setYear('')
            setLicense('')
            setOdometer('')
        })
        .catch(err => {
            console.log(err)
        })
    }

  return (
    <div>
        <form onSubmit={submitHandler}>
            <input 
                name="vehicle" 
                placeholder='Vehicle'
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <div>
                <input 
                    name="make" 
                    placeholder='Make'
                    value={make} 
                    onChange={e => setMake(e.target.value)}
                />
                <input 
                    name="model" 
                    placeholder='Model' 
                    value={model}
                    onChange={e => setModel(e.target.value)}
                />
            </div>
            <input 
                name="year" 
                placeholder='Year' 
                value={year}
                onChange={e => setYear(e.target.value)}
            />
            <input 
                name="license" 
                placeholder='License Plate' 
                value={license}
                onChange={e => setLicense(e.target.value)}
            />
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default NewVehicle