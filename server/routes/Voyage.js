let router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../database.js');
const Sequelize = require('sequelize');
const config = require('../config');

router.post('/create', async (req, res) => {

  console.log(req.files)

  res.send({
    status: false,
    message: 'No file uploaded'
  });

});

module.exports = router