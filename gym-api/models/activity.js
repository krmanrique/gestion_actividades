const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  categoria: { type: String, required: true },
  nivel: { 
    type: String, 
    enum: ['básico', 'intermedio', 'avanzado'], 
    required: true 
  },
  requisitos: { type: String },
  duracion_min: { type: Number, required: true },
  profesor: { type: String, required: true },
  cupos_maximos: { type: Number, required: true },
  trainer_id: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Activity', activitySchema);
