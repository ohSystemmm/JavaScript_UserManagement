const express = require('express');
const router = express.Router();
const userService = require('../services/user.services');

// User abfragen
router.get('/', (req, res) => {
  const users = userService.getAllUsers();
  res.json(users); // Json forman rückgabe user
});

router.post('/', (req, res) => {
  const user = req.body;
  userService.addUser(user);    //benutzerdaten hinzufügen 201 = Erstellt
  res.status(201).json(user);
});

router.put('/:id', (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;
  userService.updateUser(userId, updatedUser);    // user editieren
  res.json(updatedUser);
});

router.delete('/:id', (req, res) => {
  const userId = req.params.id;       // user löschen 204 = Kein Inhalt
  userService.deleteUser(userId);
  res.status(204).send();
});

module.exports = router;
