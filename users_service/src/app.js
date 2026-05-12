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
    status: "Online",
    role: "Admin",
    joined: "2026-05-11",
    source: "Direct",
    verified: true,
  },
  {
    id: 2,
    full_name: "Ivan Dario Cortes",
    email: "ivan.cortes@example.com",
    status: "Offline",
    role: "User",
    joined: "2026-05-10",
    source: "Google",
    verified: false,
  }
];

// Endpoint: Listar todos los usuarios
app.get('/api/users', (req, res) => {
  res.json(usersMock);
});

module.exports = app;