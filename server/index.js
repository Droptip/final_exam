const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const server = express();
server.use(express.json());
server.use(cors());

const mysqlConfig = {
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'app',
};

const dbPool = mysql.createPool(mysqlConfig).promise();

server.post('/users', async (req, res) => {
  const { name, lastName, birthDate, email } = req.body;

  try {
    const [result] = await dbPool.execute(
      'INSERT INTO users (name, lastName) VALUES (?, ?)',
      [name, lastName]
    );

    await dbPool.execute(
      'INSERT INTO user_details (user_id, date_of_birth, email) VALUES (?, ?, ?)',
      [result.insertId, birthDate, email]
      );

    return res.status(201).end();
  } catch (error) {
    console.error(error);
    return res.status(500).end();
  }
});

server.patch('/users/:id', async (req, res) => {
  const id = req.params.id;
  const { name, lastName, birthDate, email } = req.body;

  try {
    await dbPool.execute(`
      UPDATE users
      JOIN user_details ON users.id = user_details.user_id
      SET
        users.name = COALESCE(?, users.name),
        users.lastname = COALESCE(?, users.lastname),
        user_details.date_of_birth = COALESCE(?, user_details.date_of_birth),
        user_details.email = COALESCE(?, user_details.email)
      WHERE users.id = ?
    `,[name, lastName, birthDate, email, id]);
    
    return res.status(201).end();
  } catch (error) {
    console.error(error);
    return res.status(500).end();
  }
});

server.get('/users', async (req, res) => {
  try {
    const [users] = await dbPool.query('SELECT * FROM users LEFT JOIN user_details ON users.id = user_details.user_id;');
    
    const mappedUsers = users.map((user) => ({
      id: user.id,
      name: user.name,
      lastname: user.lastname,
      birthDate: user.date_of_birth,
      email: user.email,
    }));
    
    return res.status(200).json(mappedUsers);
  } catch (error) {
    console.error(error);
    return res.status(500).end();
  }
});

server.delete('/users/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await dbPool.execute('DELETE FROM user_details WHERE user_id = ?', [id]);
    await dbPool.execute('DELETE FROM users WHERE id = ?', [id]);
    return res.status(200).end();
  } catch (error) {
    console.error(error);
    return res.status(500).end();
  }
});

server.listen(8080, () => {
  console.log('Server is running on port 8080');
});
