// Dependencies

const express = require('express');
const path = require('path');

// Sets up the Express App

const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Star Wars Characters (DATA)

const reservations = [];
const tables = [];
const waitList = [];

// Routes

// Basic route that sends the user first to the AJAX Page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'home.html')));

app.get('/add', (req, res) => res.sendFile(path.join(__dirname, 'add.html')));

app.get('/view', (req, res) => res.sendFile(path.join(__dirname, 'view.html')));

// Displays all characters
app.get('/api/view', (req, res) => res.json(reservations));

app.get('/api/add', (req, res) => res.json(reservations));
// Displays a single character, or returns false

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'home.html')));


// Create New Characters - takes in JSON input
app.post('/api/reservations', (req, res) => {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  const newReservation = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newReservation.routeName = newReservation.name.replace(/\s+/g, '').toLowerCase();
  console.log(newReservation);

  reservations.push(newReservation);
  res.json(newReservation);
});

// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
