var roleTrucker = {

    /** @param {Creep} creep **/

    run: function (creep) {

        if (creep.memory.harvest && creep.store.getFreeCapacity() == 0) {
            creep.memory.harvest = false;
            creep.say('🔄 Haul!');
        }
        if (!creep.memory.harvest && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.harvest = true;
            creep.say('🚧 Harv!');
        }
        if (creep.memory.harvest) {
            creep.moveTo(Game.flags.Flag1, { visualizePathStyle: { stroke: '#D3FF39' } });
            if (creep.pos.inRangeTo(Game.flags.Flag1)){
                let goal = Game.getObjectById('5bbcb0869099fc012e63c4f3')
                if (creep.pos.isNearTo(goal)){
                    creep.harvest(goal);
                }
                else{
                    creep.moveTo(goal,{ visualizePathStyle: { stroke: '#D3FF39' } });
                }
            }
        }
        else {
            creep.moveTo(Game.flags.Storage, { visualizePathStyle: { stroke: '#D3FF39' } });
            var refill = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                        structure.structureType == STRUCTURE_TOWER ||
                        structure.structureType == STRUCTURE_CONTAINER ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_LINK ||
                        structure.structureType == STRUCTURE_STORAGE ||
                        structure.structureType == STRUCTURE_EXTENSION) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                }
            });
            if (refill.length) {
                refill.sort((b,a) => a.energy - b.energy);
                var close = creep.pos.findClosestByPath(refill);
                if (creep.pos.isNearTo(close)) {
                    creep.transfer(close, RESOURCE_ENERGY);
                }
                else {
                    creep.moveTo(close, { visualizePathStyle: { stroke: '#3D66FF' } });
                }
            }
        }
    }
};

module.exports = roleTrucker;
