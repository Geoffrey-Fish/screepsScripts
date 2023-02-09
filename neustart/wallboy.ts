var roleWallBoy = {

    /** @param {Creep} creep **/

    run: function (creep) {

        if (creep.memory.walling && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.walling = false;
            creep.say('🔄 Charge!');
        }

        if (!creep.memory.walling && creep.store.getFreeCapacity() == 0) {
            creep.memory.walling = true;
            creep.say('🚧 Walls!');
        }

        if (creep.memory.walling) {

            //Declaration of all different search jobs
            //First search for Walls to build
            let buildWalls = creep.room.find(FIND_CONSTRUCTION_SITES, {
                filter:
                    (struc) => struc.structureType == STRUCTURE_WALL ||
                        struc.structureType == STRUCTURE_RAMPART
            });

            //Then, search for walls to buff up
            let walls = creep.room.find(FIND_STRUCTURES, {
                filter: (struct) => {
                    return struct.structureType == STRUCTURE_WALL || struct.structureType == STRUCTURE_RAMPART
                }
            });
            let wall = _.filter(walls, (wall) => wall.hits < 100000);


            //finally, do something usefull with your life

            let rotts = creep.room.find(FIND_STRUCTURES, {
                filter: (struct) => {
                    return ((struct.hits < struct.hitsMax) && struct.structureType !== STRUCTURE_WALL)
                }
            });
            rotts.sort((a, b) => a.hits - b.hits);

            let tombs = creep.room.find(FIND_TOMBSTONES);



            if (buildWalls.length) {
                let closest = creep.pos.findClosestByPath(buildWalls);
                if (creep.pos.isNearTo(closest)) {
                    creep.build(closest);
                }
                else {
                    creep.moveTo(closest, { visualizePathStyle: { lineStyle: 'solid', stroke: '#5FF9F9' } });
                }
            }
            else if (wall.length) {
                let closewall = creep.pos.findClosestByPath(wall);
                if (creep.pos.isNearTo(closewall)) {
                    creep.repair(closewall)
                }
                else {
                    creep.moveTo(closewall, { visualizePathStyle: { lineStyle: 'solid', stroke: '#5FF9F9' } })
                }
            }
            else if (rotts.length) {
                let closerott = creep.pos.findClosestByPath(rotts);
                if (creep.pos.isNearTo(closerott)) {
                    creep.repair(closerott);
                }
                else {
                    creep.moveTo(closerott, { visualizePathStyle: { lineStrike: 'solid', stroke: '#5FF9F9' } });
                }
            }
            else if (tombs.length) {
                if (creep.pos.isNearTo(tombs[0])) {
                    creep.withdraw(tombs[0], RESOURCE_ENERGY);
                }
                else {
                    creep.moveTo(tombs[0], { visualizePathStyle: { linestyle: 'dotted', stroke: '#00CC00' } });
                }
            }
        }
        else {
            creep.findAccu();
        }
    }
};
module.exports = roleWallBoy;
