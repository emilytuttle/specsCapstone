const {User} = require('../models/user')
const {Vehicle} = require('../models/vehicle')

module.exports = {
    createVehicle: async (req, res) => {
        const {name, make, model, year, license, userId} = req.body
        try {
            await Vehicle.create({name: `${name}`, make: `${make}`, model: `${model}`, year: `${year}`, license: `${license}`, userId: `${userId}` })
        } catch(error) {
            console.log(error)
        }
    },

    getVehicles: async (req, res) => {
        const {userId} = req.params
        
        let allVehicles = await Vehicle.findAll({
            include: User, 
            where: {userId: userId}
        })
        res.status(200).send(allVehicles)
        console.log('getting all user vehicles')
        
    },

    getDetails: async (req, res) => {
        const {id} = req.params

        let currentVehicle = await Vehicle.findAll({
            
            where: { id: id}
        })
        res.status(200).send(currentVehicle)
        console.log('currentVehicle check, trying to pull up details page')
    }
}