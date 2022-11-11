const {Maintenance} = require('../models/maintenance')
const {Vehicle} = require('../models/vehicle')

module.exports = {
    createMaintenace: async (req, res) => {
        const {service, newStartDate, odometer, notes, id} = req.body
        try {
            await Maintenance.create({service: `${service}`, date: `${newStartDate}`, odometer: `${odometer}`, notes: `${notes}`, vehicleId: `${id}`})
        } catch(error) {
            console.log(error)
        }
    },

    getMaintenance: async (req, res) => {
        const {id} = req.params
        
        let maintenanceItems = await Maintenance.findAll({
            include: Vehicle,
            where: {vehicleId: id},
            order: [
                ['updatedAt', 'DESC']
            ]
        })
        res.status(200).send(maintenanceItems)
        console.log('pulling maintenance items')
    },

    putMaintenance: async (req, res) => {
        const {service, date, odometer, notes, maintenanceId} = req.body
        try {
            await Maintenance.update(
                {
                    service: `${service}`, 
                    date: `${date}`, 
                    odometer: `${odometer}`, 
                    notes: `${notes}`
                },
                {
                    where: {id: maintenanceId}
                }
            )
        } catch(error) {
            console.log(error `on putMaintenance`)
        }
    },

    deleteMaintenance: async (req, res) => {
        const {id} = req.params
        try {
            await Maintenance.destroy(
                {
                    where: {id: id}
                }
            )
            res.sendStatus(200)
        }
        catch (error) {
            console.log(error, `Error deleting maintenance item`)
        }
    }
}