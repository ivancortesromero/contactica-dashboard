const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/users', async(req, res) => {
  try {
    const wpResponse = await axios.get(
      'http://wordpress/wp-json/wp/v2/users',
      {
        auth: {
          username: process.env.WORDPRESS_USERNAME,
          password: process.env.WORDPRESS_PASSWORD
        }
      }
    );

    const users = wpResponse.data.map((user) => ({
      id: user.id,
      full_name: user.name,
      email: user.email,
      role: user.roles?.[0],
      telephone: user.telephone || '',
      verified: user.verified === '1',
      joined: new Date(user.joined).toLocaleString(),
      source: user.source || 'WordPress'
    }));

    return res.json(users);

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

app.post('/api/users', async (req, res) => {

  try {
    const newUser = req.body;

    const wpResponse = await axios.post(
      'http://wordpress/wp-json/wp/v2/users',
      {
        username: newUser.email,
        first_name: newUser.full_name,
        email: newUser.email,
        password: 'Temp123456!',
        roles: ['subscriber'],
        source: 'Dashboard',
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

app.put('/api/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = req.body;
    const wpResponse = await axios.post(
      `http://wordpress/wp-json/wp/v2/users/${userId}`,
      {
        name: updatedUser.full_name,
        telephone: updatedUser.telephone,
        verified: updatedUser.verified
      },
      {
        auth: {
          username: process.env.WORDPRESS_USERNAME,
          password: process.env.WORDPRESS_PASSWORD
        }
      }
    );

    return res.json(wpResponse.data);

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

app.delete('/api/users/:id', async (req, res) => {
  try {

    const userId = req.params.id;

    await axios.delete(
      `http://wordpress/wp-json/wp/v2/users/${userId}`,
      {
        auth: {
          username: process.env.WORDPRESS_USERNAME,
          password: process.env.WORDPRESS_PASSWORD
        },
        params: {
          force: true,
          reassign: 1
        }
      }
    );

    return res.json({
      success: true
    });

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