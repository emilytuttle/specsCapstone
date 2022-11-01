require('dotenv').config()

const express = require('express')
const cors = require('cors')

const {sequelize} = require('./util/database')
const {PORT} = process.env
const {User} = require('./models/user')
const {Vehicle} = require('./models/vehicle')
const {Maintenance} = require('./models/maintenance')
const {register, login} = require('./controllers/auth')
const {createVehicle, getVehicles, getDetails} = require('./controllers/vehicles')
const {createMaintenace} = require('./controllers/maintenance')

const app = express()

app.use(express.json())
app.use(cors())

User.hasMany(Vehicle)
Vehicle.belongsTo(User)

User.hasMany(Maintenance)
Maintenance.belongsTo(User)

Vehicle.hasMany(Maintenance)
Maintenance.belongsTo(Vehicle)


//ENDPOINTS

//AUTH
app.post('/register', register)
app.post('/login', login)

app.post('/createVehicle', createVehicle)
app.get('/uservehicles/:userId', getVehicles)
app.get('/vehicle/:id', getDetails)

app.post('/createMaintenace', createMaintenace)

sequelize.sync()
    

    app.listen(PORT, () => console.log(`server running on port ${PORT}`))


