var roomsDefense = require('rooms.defense');
var roomsSpawning = require('rooms.spawning');
var customCreepCheck = require('rooms.customCreepCheck');
var posfunctions = require('rooms.posfunctions');


function roomsHub() {

    _.forEach(Game.rooms, function (room) {

        if (room && room.controller && room.controller.my) {
            //TESTRAUM

            //TESTRAUM
            roomsDefense(room);
            customCreepCheck(room);
            roomsSpawning(room);
        }
    });
}

module.exports = roomsHub;