const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let users = [];

// GET endpoint to retrieve all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// GET endpoint to retrieve a single user by email
app.get('/api/users/:email', (req, res) => {
  const email = req.params.email;
  const user = users.find(user => user.email === email);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// POST endpoint for user login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(user => user.email === email && user.password === password);

  if (user) {
    res.json({ message: 'Login successful' });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// POST endpoint for user sign up
app.post('/api/signup', (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.json(newUser);
});

// DELETE endpoint to remove a user by email
app.delete('/api/users/:email', (req, res) => {
  const email = req.params.email;
  const index = users.findIndex(user => user.email === email);

  if (index !== -1) {
    const deletedUser = users.splice(index, 1)[0];
    res.json(deletedUser);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// PUT endpoint to update a user by email
app.put('/api/users/:email', (req, res) => {
  const email = req.params.email;
  const updatedUser = req.body;
  const index = users.findIndex(user => user.email === email);

  if (index !== -1) {
    users[index] = { ...users[index], ...updatedUser };
    res.json(users[index]);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
