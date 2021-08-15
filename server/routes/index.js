const router = require('express').Router();

const User = require('./User.js');
const Users = require('./Users.js');

const Team = require('./Team.js');

const Voyage = require('./Voyage.js');

//Users
router.use('/user', User);
router.use('/users', Users);

//Team
router.use('/team', Team);

//Voyages
router.use('/voyage', Voyage);

module.exports = router;