var creepFunctions = require('rooms.creepfunctions');
var posFunctions = require('rooms.posfunctions');
var roomsHub = require('rooms.hub');
var powerDistro = require('rooms.powerDistro');
module.exports.loop = function () {

    roomsHub();

    global.ROLES = {
        harvester: require('role.harvester'),
        hauler: require('role.hauler'),
        builder: require('role.builder'),
        upgrader: require('role.upgrader'),
        repairer: require('role.repairer'),
        wallboy: require('role.wallboy'),

        sattacker: require('role.sattacker'),
        lattacker: require('role.lattacker'),
        healer: require('role.healer'),

        trucker: require('role.trucker'),
        powerdude: require('role.powerdude')
    }

    for (var name in Memory.creeps) {
        let creep = Game.creeps[name];
        if (!creep) {
            delete Memory.creeps[name];
        }
        else {
            ROLES[creep.memory.role].run(creep);
        }
    }

    // ich sollte das woanders einbauen, vielleicht bei den rollen selbst

    // if (Game.spawns['Spawn1'].spawning) {
    //     var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
    //     Game.spawns['Spawn1'].room.visual.text('🛠️' + spawningCreep.memory.role,
    //         Game.spawns['Spawn1'].pos.x + 1,
    //         Game.spawns['Spawn1'].pos.y + 2,
    //         { align: 'center', opacity: 1.0 });
    //}
}
