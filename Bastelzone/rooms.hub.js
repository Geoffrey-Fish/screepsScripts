var roomsDefense = require('rooms.defense');
var roomsSpawning = require('rooms.spawning');



function roomsHub() {
    _.forEach(Game.rooms, function (room) {
        if (room && room.controller && room.controller.my) {
            roomsSpawning(room);
            roomsDefense(room);
        }
    });
}

module.exports = roomsHub;
