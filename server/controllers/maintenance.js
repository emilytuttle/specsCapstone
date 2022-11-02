const {Maintenance} = require('../models/maintenance')
const {Vehicle} = require('../models/vehicle')

module.exports = {
    createMaintenace: async (req, res) => {
        const {service, date, odometer, notes, id} = req.body
        try {
            await Maintenance.create({service: `${service}`, date: `${date}`, odometer: `${odometer}`, notes: `${notes}`, vehicleId: `${id}`})
        } catch(error) {
            console.log(error)
        }
    },

    getMaintenance: async (req, res) => {
        const {id} = req.params
        
        let maintenanceItems = await Maintenance.findAll({
            include: Vehicle,
            where: {vehicleId: id}
        })
        res.status(200).send(maintenanceItems)
        console.log('pulling maintenance items')
    }
}