const pool = require('../models/db');
const { v4: uuidv4 } = require('uuid');

const dataPath = './data/activities.json';

function readData() {
  return JSON.parse(fs.readFileSync(dataPath));
}

function writeData(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

exports.getAll = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM activities');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener actividades' });
  }
};

exports.getById = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM activities WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Actividad no encontrada' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener la actividad' });
  }
};

exports.create = async (req, res) => {
  const {
    nombre, descripcion, categoria, nivel,
    requisitos, duracion_min, profesor,
    cupos_maximos, trainer_id
  } = req.body;

  const id = uuidv4();

  try {
    await pool.query(`
      INSERT INTO activities (
        id, nombre, descripcion, categoria, nivel, requisitos,
        duracion_min, profesor, cupos_maximos, trainer_id
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
      )
      
    `, [
      id, nombre, descripcion, categoria, nivel, requisitos,
      duracion_min, profesor, cupos_maximos, trainer_id
    ]);

    res.status(201).json({ id, nombre, descripcion, categoria, nivel, requisitos, duracion_min, profesor, cupos_maximos, trainer_id });
  } catch (err) {
    console.error('Error al insertar actividad:', err);
    res.status(500).json({ error: 'Error al crear la actividad' });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const campos = req.body;

  const keys = Object.keys(campos);
  const values = Object.values(campos);

  if (keys.length === 0) return res,status(400),json({ error: 'No se enviaron datos '});

  const sets = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');

  try {
    await pool.query(`UPDATE activities SET ${sets} WHERE id = $${keys.length + 1}`, [...values, id]);
    res.json({ message: 'Actividad actualizada' });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar actividad' });
  }
};

exports.remove = async (req, res) => {
  try {
    await pool.query('DELETE FROM activities WHERE id = $1', [req.params.id]);
    res.statys(204).end();
  } catch (err) {
    res.status(500).json({ error: 'error al eliminar la actividad' });
  }
};

exports.assignTrainer =  async (req, res) => {
  try {
    await pool.query('UPDATE activities SET trainer_id = $1 WHERE id = $2', [
      req.params.trainer_id,
      req.params.id
    ]);
    res.json({ message: 'Entrenador asignado a la actividad' });
  } catch (err) {
    res.status(500).json({ error: 'Error al asignar entrenador'});
  }
};

exports.getAttendees =  async (req, res) => {
  try{
    res.json({ message: 'Lista de asistentes a la actividad' }); //cuando se conecte se realizará la consulta
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener asistentes'});
  }
};