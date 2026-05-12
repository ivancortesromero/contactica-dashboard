const express = require('express');
const cors = require('cors');
const axios = require('axios');

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
app.post('/api/users', async (req, res) => {

  try {
    const newUser = req.body;

    const wpResponse = await axios.post(
      'http://wordpress/wp-json/wp/v2/users',
      {
        username: newUser.email,
        name: newUser.full_name,
        email: newUser.email,
        password: 'Temp123456!',
        roles: ['subscriber'],
        telephone: newUser.telephone,
        verified: newUser.verified
      },
      {
        auth: {
          username: process.env.WORDPRESS_USERNAME,
          password: process.env.WORDPRESS_PASSWORD
        }
      }
    );

    return res.status(201).json(wpResponse.data);

  } catch (error) {
    console.error(
      error.response?.data || error.message
    );

    return res.status(500).json({
      success: false,
      error: error.response?.data || error.message
    });
  }
});

module.exports = app;