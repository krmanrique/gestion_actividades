require('dotenv').config();
const express = require('express');
const cosr = require('cors');
const bodyParser = require('body-parser');
const activitiesRoutes = require('./routes/activities');

const app = express();
app.use(cosr());
app.use(bodyParser.json());

app.use('/activities', activitiesRoutes);

app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});