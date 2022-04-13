const { Router } = require('express')
const ObjectController = require('../controllers/ObjectsController')

const router = Router()

router
    .get('/objects', ObjectController.listAll)
    .get('/objects/:id', ObjectController.listOne)
    .post('/objects', ObjectController.create)
    .put('/objects/:id', ObjectController.update)
    .delete('/objects/:id', ObjectController.delete)  
    .get('/objects/:id1/relationObject/:id2', ObjectController.listOneRelation)
    .get('/objects/:id1/relationObject/', ObjectController.listAllrelationObject)
    .post('/objects/relationObject/', ObjectController.insertRelationIntoObject)
    .delete('/objects/:id1/relationObject/:id2', ObjectController.deleteRelationInObject)
    
module.exports = router