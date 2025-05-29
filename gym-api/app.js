require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./models/db');
const activitiesRoutes = require('./routes/activities');

const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use('/activities', activitiesRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
