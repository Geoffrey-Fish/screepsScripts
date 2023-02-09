const roomsHub = require("./rooms.hub");

var hauler = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if (!creep.memory.spot) {
            creep.spotting();
        };
        if (creep.memory.hauling && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.hauling = false;
            creep.say('🧲 ');
        };
        if (!creep.memory.hauling && creep.store.getFreeCapacity() == 0) {
            creep.memory.hauling = true;
            creep.say('🚧 ');
        };
        if (creep.memory.hauling) {

            creep.refill();
        }
        else {
            let list = creep.room.memory['openDrops'];
            if (list.length == 0) {
                console.log('building new list');
                creep.newSpots();
            }
            creep.drops();
        }
    }
};

module.exports = hauler;
