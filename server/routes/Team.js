let router = require('express').Router();
const { User, Team } = require('../database.js');
const Sequelize = require('sequelize');

router.post('/create', async (req, res) => {

  let currentUser = req.user;
  const { teamName } = req.body;

  if(!teamName) {
    res.status(400).send({
      status: false,
      message: 'No team inserted'
    });
  }

  const [team, created] = await Team.findOrCreate({
    where: {
      [Sequelize.Op.or]: [
        { team_name: teamName }
      ]
    },
    defaults: {
      team_name: teamName,
      team_id: parseInt(Date.now()) + parseInt(Math.random()),
      count: 0,
    }
  });

  if (created) {
    res.status(200).send({
      data: {
        type: 'resolve',
        label: `Team ${teamName} was inserted`
      }
    });
  } else {
    res.status(200).send({
      data: {
        type: 'error',
        label: `Team ${teamName} already exist`
      }
    })
  }

});

module.exports = router