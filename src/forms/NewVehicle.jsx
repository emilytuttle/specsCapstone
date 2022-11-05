import React from 'react'
import { useState, useContext } from 'react'
import axios from 'axios'
import AuthContext from '../store/authContext'
import classes from './NewVehicle.module.css'


const NewVehicle = ({getVehicles}) => {
    const {userId} = useContext(AuthContext)

    const [name, setName] = useState('')
    const [make, setMake] = useState('')
    const [model, setModel] = useState('')
    const [year, setYear] = useState('')
    const [license, setLicense] = useState('')
    const [odometer, setOdometer] = useState('')

    const [open, setOpen] = useState(false)

    const openClose = () => {
        setOpen(current => !current)
    }

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

            getVehicles()
        })
        .catch(err => {
            console.log(err)
        })
    }

  return (
    <div>
        <button className={classes.vehicleAdd} onClick={openClose}> Add Vehicle</button>
        { open && (<div className={classes.formContainer}>
        <div className={classes.titleX}>
        <h1>Add Vehicle</h1>
        <div className={classes.x} onClick={openClose}>X</div>
        </div>
        
        <form onSubmit={submitHandler}>
            <div className={classes.makeModel}>
                <input 
                    placeholder='Make'
                    value={make} 
                    onChange={e => setMake(e.target.value)}
                    className={classes.shortInput}
                    required
                />
                <input 
                    placeholder='Model' 
                    value={model}
                    onChange={e => setModel(e.target.value)}
                    className={classes.shortInput}
                />
            </div>
            <input 
                placeholder='Description (optional)'
                value={name}
                onChange={e => setName(e.target.value)}
                className={classes.description}
            />

            <div className={classes.yearLicense}>
                <input 
                    placeholder='Year' 
                    value={year}
                    onChange={e => setYear(e.target.value)}
                    className={classes.shortInput}
                />
                <input 
                    placeholder='License Plate' 
                    value={license}
                    onChange={e => setLicense(e.target.value)}
                    className={classes.shortInput}
                />
            </div>
           
           
            <button type="submit" className={classes.vehicleSubmit}>Add to Garage</button>
        </form>
    </div>)}
    </div>
    
  )
}

export default NewVehicle