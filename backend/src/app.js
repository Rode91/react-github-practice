const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/user.routes');
const healthRoutes = require('./routes/health.routes');
const errorHandler = require('./middlewares/error.middleware');


const app = express();

// Middlewares globales
app.use(cors({
  origin: 'http://localhost:5173',
}));

app.use(express.json());


// Rutas
app.use('/api/health', healthRoutes);
app.use('/api/users', userRoutes);

// Middleware de manejo de errores
app.use(errorHandler);


module.exports = app;
