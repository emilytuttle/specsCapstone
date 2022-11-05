import React, {useState} from 'react'
import classes from './DetailContainer.module.css'
import NewMaintenance from '../forms/NewMaintenance'
import axios from 'axios'

const DetailContainer = ({vehicle}) => {
  const [name, setName] = useState(`${vehicle.name}`)
  const [make, setMake] = useState(`${vehicle.make}`)
  const [model, setModel] = useState(`${vehicle.model}`)
  const [year, setYear] = useState(`${vehicle.year}`)
  const [license, setLicense] = useState(`${vehicle.license}`)

  const vehicleId = `${vehicle.id}`

  const [editing, setEditing] = useState(false)
    

    const toggleEditing = () => {
      setEditing(current => !current)
    }

    const editHandler = (e) => {
      e.preventDefault()

      const body = {
        name,
        make,
        model,
        year,
        license,
        vehicleId
      }

      const url = 'http://localhost:3000'

      axios.put(`${url}/editvehicle`, body)
      .then((res) => {
        toggleEditing()
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })


    }
  return (
    <div>

        {editing && (
          <div className={classes.editCar}>
            <h1 onClick={toggleEditing} className={classes.x}>X</h1>
            <div>
              <form onSubmit={editHandler}>
                <input 
                  placeholder='Vehicle'
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
                <div>
                  <input 
                    placeholder='Make'
                    value={make} 
                    onChange={e => setMake(e.target.value)}
                  />
                  <input
                    placeholder='Model' 
                    value={model}
                    onChange={e => setModel(e.target.value)}
                  />
                </div>
                <input 
                    placeholder='Year' 
                    value={year}
                    onChange={e => setYear(e.target.value)}
                />
                <input 
                    placeholder='License Plate' 
                    value={license}
                    onChange={e => setLicense(e.target.value)}
                />
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        )}

        
        <div className={classes.carCard}>
          <img src='./edit.png' />
          <div>
            <h1 className={classes.title}>{vehicle.year} {vehicle.make} {vehicle.model}</h1>
            <h2>{vehicle.name}</h2>
            <h2>{vehicle.license}</h2>
            <button onClick={toggleEditing}>edit</button>
          </div>
          
        </div>
        <div>
          <div>Add Maintenance Item</div>
          <NewMaintenance id={vehicle.id}/>
        </div>
       
    </div>
  )
}

export default DetailContainer