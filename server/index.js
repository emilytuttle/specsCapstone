require('dotenv').config()

const express = require('express')
const cors = require('cors')

const {sequelize} = require('./util/database')
const {PORT} = process.env
const {User} = require('./models/user')
const {Playlist} = require('./models/playlist')
const {register, login} = require('./controllers/auth')

const app = express()

app.use(express.json())
app.use(cors())

User.hasMany(Playlist)
Playlist.belongsTo(User)


//ENDPOINTS

//AUTH
app.post('/register', register)
app.post('/login', login)

sequelize.sync()
    

        app.listen(PORT, () => console.log(`server running on port ${PORT}`))


