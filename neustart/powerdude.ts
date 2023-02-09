var rolePowerDude = {

    /** @param {Creep} creep **/

    run: function (creep) {
        if (creep.memory.powering && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.powering = false;
            creep.say('🔄 Reload!');
        }
        else if (!creep.memory.powering && creep.store.getFreeCapacity() == 0) {
            creep.memory.powering = true;
            creep.say('💯 POWER!');
        }

        if (creep.memory.powering) {
            
            let towers = creep.room.find(FIND_STRUCTURES,{
                filter: (struct) => struct.structureType == STRUCTURE_TOWER
            });
            let extens = creep.room.find(FIND_STRUCTURES,{
                filter: (struct) => struct.structureType == STRUCTURE_EXTENSION
                });
            if (towers.length){
                _.forEach(towers, function(tower) {
                    if(tower.store.getFreeCapacity(RESOURCE_ENERGY) > 0){
                        if (creep.pos.isNearTo(tower)){
                            creep.transfer(tower,RESOURCE_ENERGY);
                        }
                        else{
                            creep.moveTo(tower, {visualizePathStyle:{lineStyle: 'solid', stroke: '#FF00FF00'}})
                        }
                    }
                });
            }
            else if (extens.length){
                _.forEach(extens, function(exten) {
                    if(exten.getFreeCapacity() > 0){
                        if (creep.pos.isNearTo(exten)){
                            creep.transfer(exten,RESOURCE_ENERGY);
                        }
                        else{
                            creep.moveTo(exten, {visualizePathStyle:{lineStyle: 'solid', stroke: '#FF00FF00'}})
                        }
                    }
                });
            }
        }
        else{
            creep.findAccu();
        }
    }
};

module.exports = rolePowerDude;