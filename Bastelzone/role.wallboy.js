var roleWallBoy = {

    /** @param {Creep} creep **/

    run: function (creep) {
        if (creep.memory.charging == undefined) {
            console.log("WallBoy undefined!");
            creep.memory.charging = true;
        }
        if (creep.memory.charging && creep.store.getFreeCapacity() == 0) {
            creep.memory.charging = false;
            creep.say('🚧 Walls!');
        }

        if (!creep.memory.charging && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.charging = true;
            creep.say('🔄 Charge!');
        }

        if (creep.memory.charging) {
            creep.harvestEnergy();
            //creep.findAccu();
        }
        else {
            var walls = creep.room.find(FIND_STRUCTURES, {
                filter: (struct) => {
                    return (struct.structureType == (STRUCTURE_WALL && (struct.hits < 10000)))
                }
            });
            walls.sort((a, b) => a.hits - b.hits);
            if (walls.length) {
                var wall = creep.pos.findClosestByPath(walls);
                if (creep.pos.isNearTo(wall)) {
                    creep.repair(wall);
                }
                else {
                    creep.moveTo(wall, { visualizePathStyle: { stroke: '#FF6539' } });
                }
            }
        }
    }
};
module.exports = roleWallBoy;
