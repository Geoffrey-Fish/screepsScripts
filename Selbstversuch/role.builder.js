var builder = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 Reload!');
        }
        else if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('💯 BOBDER!');
        }

        if (creep.memory.building) {

            let contis = creep.room.find(FIND_CONSTRUCTION_SITES
             , {filter: (site) => site.structureType == STRUCTURE_CONTAINER});

            let sites = creep.room.find(FIND_CONSTRUCTION_SITES)
            //     , {
            //     filter: (struct)=> struct.progressTotal != 45000
            // });

            if (contis.length) {
                if (creep.pos.isNearTo(contis[0])) {
                    creep.build(contis[0]);
                }
                else {
                    creep.moveTo(contis[0], {visualizePathStyle:{lineStyle: 'dashed',stroke: '#F1FF26'}})
                }
            }
            else if(!contis.length && sites.length){
                let closestSite = creep.pos.findClosestByPath(sites);
                if (creep.pos.isNearTo(closestSite)) {
                    creep.build(closestSite);
                    if (closestSite.progress == closestSite.progressTotal) {
                        creep.say('Building finished');
                        creep.immobilia();
                    }
                }
                else {
                     creep.moveTo(closestSite, { visualizePathStyle:{lineStyle:'dashed',stroke:'#F1FF26'}})
                }
            }
        }

        else {
            creep.findAccu();
        }
    }
};

module.exports = builder;
