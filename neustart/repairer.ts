var roleRepairer = {
    /** @param {Creep} creep **/

    run: function (creep) {

        if (creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.repairing = false;
            creep.say('🔄');
        }

        if (!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
            creep.memory.repairing = true;
            creep.say('🚧');
        }
        if (creep.memory.repairing) {
            var rotts = creep.room.find(FIND_STRUCTURES, {
                filter: (struct) => {
                    return ((struct.hits < struct.hitsMax) && struct.structureType !== STRUCTURE_WALL && struct.structureType !== STRUCTURE_RAMPART)
                }
            });
            if (rotts.length) {
                let closerott = creep.pos.findClosestByPath(rotts);
                if (creep.pos.isNearTo(closerott)) {
                    creep.repair(closerott);
                }
                else {
                    creep.moveTo(closerott, { visualizePathStyle: { linestyle: 'dotted', stroke: '#00CC00' } });
                }
            }
        }
        else {
            creep.findAccu();
            // let accus = creep.room.find(FIND_STRUCTURES, {
            //     filter: (struct) => {
            //         return (
            //             struct.structureType == STRUCTURE_EXTENSION ||
            //             struct.structureType == STRUCTURE_CONTAINER ||
            //             struct.structureType == STRUCTURE_LINK ||
            //             struct.structureType == STRUCTURE_STORAGE) &&
            //             struct.store[RESOURCE_ENERGY] > 0;
            //             }
            // });
            // if (accus.length) {
            //     let closestAccu = creep.pos.findClosestByRange(accus);
            //     if (creep.pos.isNearTo(closestAccu)) {
            //         creep.withdraw(closestAccu, RESOURCE_ENERGY);
            //     }
            //     else {
            //         creep.moveTo(closestAccu, { visualizePathStyle: {lineStyle: 'dotted', stroke: '#FF007F' } });
            //     }
            // }
        }
    }
};
module.exports = roleRepairer;
//  else if (closestSite.progress == closestSite.progressTotal) {
                        // creep.say('Building finished');
                        // creep.immobilia();
                    // }
