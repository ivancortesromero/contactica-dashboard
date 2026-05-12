const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors()); // Permite peticiones desde el front
app.use(express.json());

// Mock de usuarios (con los campos que definimos para la tabla)
const usersMock = [
  {
    id: 1,
    full_name: "Carlangas Zipatoque",
    email: "carlangaszipatoque@gmail.com",
    role: "Admin",
    joined: "2026-05-11",
    source: "WordPress",
    telephone: "+57 300 1234567",
    verified: true,
  },
  {
    id: 2,
    full_name: "Ivan Dario Cortes",
    email: "ivan.cortes@example.com",
    role: "User",
    joined: "2026-05-10",
    source: "Dashboard",
    telephone: "+57 313 7654321",
    verified: false,
  }
];

// Endpoint: Listar todos los usuarios
app.get('/api/users', (req, res) => {
  res.json(usersMock);
});

// Endpoint: Crear usuario (mock)
app.post('/api/users', (req, res) => {
  const newUser = req.body;
  return res.status(201).json({
    success: true,
    data: newUser
  });
});

module.exports = app;