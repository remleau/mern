module.exports = (database, Sequelize) => {
	let Team = database.define('Team', {
    team_id: {
      type: Sequelize.STRING.BINARY,
      allowNull: false
    },
		team_name: {
			type: Sequelize.STRING,
			allowNull: false
		},
    count: {
      type: Sequelize.STRING.BINARY,
      allowNull: false
    }
	});

	return Team;
}