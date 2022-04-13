const database = require('../models')
const messages = require('../config/messages.js')

class ObjectController {
    static async listAll(req, res) {
        try {
            const allObjects = await database.Objects.findAll()
            
            return res.status(200).json(allObjects)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async listOne(req, res) {
        const { id } = req.params
        try {
            const oneObject = await database.Objects.findOne( { where: { id: Number(id) } } )
            
            return res.status(200).json(oneObject) 
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async create(req, res) {
        const newObject = req.body
        try {
            const relationExists = await database.Artistas.findOne({
                where: { id: Number(newObject.id_relation) }
            })

            if(!relationExists){
                return res.status(404).json({ message: messages.NOT_FOUND })
            }

            const newObjectCreated = await database.Objects.create(newObject)
            
            return res.status(201).json(newObjectCreated) 
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async update(req, res) {
        const { id } = req.params
        const newInfo = req.body
        try {
            await database.Objects.update(newInfo,  { where: { id: Number(id) } } )
            const objectsUpdated = await database.Objects.findOne( { where: { id: Number(id) } } )
           
            return res.status(200).json(objectsUpdated)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async delete(req, res) {
        const { id } = req.params
        try {
            const objectExists = await database.Objects.findOne({
                where: { id: Number(id) }
            })

            if(!objectExists){
                return res.status(404).json({ message: messages.NOT_FOUND })
            }

            await database.Objects.destroy({ where: { id: Number(id) } } )
            return res.status(200).json({ message: messages.DELETED })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async listOneRelation(req, res) {
        const { id_object, id_relation } = req.params
        try {
            const relationExists = await database.Objects_relations.findOne({
                where: {
                    id_object: Number(id_object),
                    id_relation: Number(id_relation)
                }
            })
            
            if(!relationExists) {
                return res.status(404).json({ message: messages.NOT_FOUND })
            } 
            
            const infoRelation = await database.Relations.findOne({ where: { id: Number(id_relation) } })
            const infoObject = await database.Objects.findOne({ where: { id: Number(id_object) } })
            
            const relationFormated = {
                id_object: id_object,
                id_relation: id_relation, 
                object: infoObject.name,
                relation: infoRelation.name
            }
            return res.status(200).json(relationFormated)
            
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async listAllRelations(req, res) {
        const { id_object } = req.params
        try {
            const allRelations = await database.Objects_relations.findAll({
                where: {
                    id_object: Number(id_object)
                },
                include: {
                    model: database.Relations
                }
            })

            if(!allRelations) {
                return res.status(500).json({ message: messages.NOT_FOUND }) 
            } 

            const relationsFormatas = allRelations.map(relation => ({
                id_relation: relation.id_relation,
                id_object: relation.id_object,
                name: relation.Relation.name
            }))

            return res.status(200).json(relationsFormatas)
            
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async insertRelationIntoObject(req, res) {
        const newRegister = req.body
        try {
            
            const newRelation = await database.Relations.findOne({
                where: { id: Number(newRegister.id_relation) }
            })

            if(!newRelation){
                return res.status(404).json({ message: messages.NOT_FOUND })
            } else {
                const newRegisterCreated =  await database.Objects_relations.create(newRegister)
                return res.status(200).json(newRegisterCreated)
            }

        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async deleteRelationInObject(req, res) {
        const { id_object, id_relation } = req.params
        try {
            const relationExists = await database.Relations.findOne({
                where: { id: Number(id_relation) }
            })

            if(!relationExists){
                return res.status(404).json({ message: messages.NOT_FOUND })
            }

            await database.Objects_relations.destroy({
                where: {
                    id_object: Number(id_object),
                    id_relation: Number(id_relation)
                }
            })
            return res.status(200).json({ message: messages.DELETED })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = ObjectController