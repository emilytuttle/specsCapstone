const {Maintenance} = require('../models/maintenance')

module.exports = {
    createMaintenace: async (req, res) => {
        const {service, date, odometer, notes, id} = req.body
        try {
            await Maintenance.create({service: `${service}`, date: `${date}`, odometer: `${odometer}`, notes: `${notes}`, vehicleId: `${id}`})
        } catch(error) {
            console.log(error)
        }
    }
}