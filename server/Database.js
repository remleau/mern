const models = require('./models');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const config = require('./config');

let database = new Sequelize(
  config.db.name,
  config.db.user,
  config.db.password,
  {
    host: config.db.host,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const User = models.UserModel(database, Sequelize);
const Team = models.TeamModel(database, Sequelize);

const init = async () => {
	await database.sync({ force: true }) // force true will drop the table if it already exists
	.then(() => {
		User.create({
      user_id: '1',
			firstName: 'Rémy',
			lastName: 'Groleau',
			username: 'remleau',
			email: 'remleau@gmail.com',
			password: bcrypt.hashSync('allo1234', 8),
      role: {
        admin: 'admin',
      },
      team_id: '1'
    });

    Team.create({
      team_id: '1',
      team_name: 'remleau',
    });
	});
}

module.exports = {
	init,
	User,
  Team,
};