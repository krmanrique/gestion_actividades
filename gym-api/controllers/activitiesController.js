const Activity = require('../models/activity');
const { v4: uuidv4 } = require('uuid');


exports.getAll = async (req, res) => {
  try {
    const activities = await Activity.find();
    res.json(activities);
  } catch (err) {
    console.error('Error al obtener actividades:', err);
    res.status(500).json({ error: 'Error al obtener actividades' });
  }
};


exports.getById = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) return res.status(404).json({ error: 'Actividad no encontrada' });
    res.json(activity);
  } catch (err) {
    console.error('Error al obtener actividad:', err);
    res.status(500).json({ error: 'Error al obtener la actividad' });
  }
};


exports.create = async (req, res) => {
  try {
    const activity = new Activity({ ...req.body });
    await activity.save();
    res.status(201).json(activity);
  } catch (err) {
    console.error('Error al crear actividad:', err);
    res.status(500).json({ error: 'Error al crear la actividad' });
  }
};


exports.update = async (req, res) => {
  try {
    const updatedActivity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedActivity) return res.status(404).json({ error: 'Actividad no encontrada' });
    res.json({ message: 'Actividad actualizada', updatedActivity });
  } catch (err) {
    console.error('Error al actualizar actividad:', err);
    res.status(500).json({ error: 'Error al actualizar actividad' });
  }
};


exports.remove = async (req, res) => {
  try {
    await Activity.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    console.error('Error al eliminar actividad:', err);
    res.status(500).json({ error: 'Error al eliminar la actividad' });
  }
};


exports.assignTrainer = async (req, res) => {
  try {
    const updatedActivity = await Activity.findByIdAndUpdate(
      req.params.id,
      { trainer_id: req.params.trainer_id },
      { new: true }
    );
    if (!updatedActivity) return res.status(404).json({ error: 'Actividad no encontrada' });
    res.json({ message: 'Entrenador asignado a la actividad', updatedActivity });
  } catch (err) {
    console.error('Error al asignar entrenador:', err);
    res.status(500).json({ error: 'Error al asignar entrenador' });
  }
};


exports.getAttendees = async (req, res) => {
  try {
    res.json({ message: 'Lista de asistentes a la actividad' }); // implementar más adelante
  } catch (err) {
    console.error('Error al obtener asistente:', err);
    res.status(500).json({ error: 'Error al obtener asistentes' });
  }
};

//Cuando se implemente el servicio de asistencia, descomentar este código para obtener los asistentes desde el servicio externo
// const axios = require('axios');

// exports.getAttendees = async (req, res) => {
//   try {
//     const response = await axios.get(`https://api-del-grupo4.vercel.app/attendance/activity/${req.params.id}`);
//     res.json(response.data);
//   } catch (err) {
//     res.status(500).json({ error: 'Error al obtener asistentes desde el servicio de asistencia' });
//   }
// };
