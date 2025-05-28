const express = require('express');
const router = express.Router();
const activitiesController = require('../controllers/activitiesController');

router.get('/', activitiesController.getAll);
router.get('/:id', activitiesController.getById);
router.post('/', activitiesController.create);
router.put('/:id', activitiesController.update);
router.delete('/:id', activitiesController.remove);
router.put('/:id/assign-trainer/:trainerId', activitiesController.assignTrainer);
router.get('/:id/attendees', activitiesController.getAttendees); //Puede esta vacio

module.exports = router;