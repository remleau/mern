const { User, Team } = require('./../database.js');

module.exports = (io) => {

  io.sockets.on('connection', function (socket) {
    socket.on('getAllUsers', async () => {
      const _users = await User.findAll() || { error: 'No users' };
  
      io.sockets.emit('getAllUsers', JSON.stringify(_users));
    });

    socket.on('getAllTeams', async () => {
      let results = [];
      const _teams = await Team.findAll() || { error: 'No teams' };

      let $i = 0;
      let $length = _teams.length;

      _teams && _teams.forEach(async (team, i) => {
        const _users = await User.findAndCountAll({ where: { team_id: team.team_id } });

        results[i] = {
          team_name: team.team_name,
          team_id: team.team_id,
          count: _users.count
        }

        if ($i == $length - 1) {
          console.log(results);
          io.sockets.emit('getAllTeams', JSON.stringify(results));
        }

        $i++;
      });
    })
  });

}
