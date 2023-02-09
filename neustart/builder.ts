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

            let allsites = creep.room.find(FIND_CONSTRUCTION_SITES);
            let contis = _.filter(allsites, (site) => site.structureType == STRUCTURE_CONTAINER);
            let fastSites = _.filter(allsites, (site) => site.progressTotal != 45000);

            if (contis.length) {
                if (creep.pos.isNearTo(contis[0])) {
                    creep.build(contis[0]);
                }
                else {
                    creep.moveTo(contis[0], { visualizePathStyle: { lineStyle: 'dashed', stroke: '#F1FF26' } })
                }
            }
            else if (fastSites.length) {
                let closestSite = creep.pos.findClosestByPath(fastSites);
                if (creep.pos.isNearTo(closestSite)) {
                    creep.build(closestSite);
                }
                else {
                    creep.moveTo(closestSite, { visualizePathStyle: { lineStyle: 'dashed', stroke: '#F1FF26' } })
                }
            }
            else {
                let closestSite = creep.pos.findClosestByPath(allsites);
                if (creep.pos.isNearTo(closestSite)) {
                    creep.build(closestSite);
                }
                else {
                    creep.moveTo(closestSite, { visualizePathStyle: { lineStyle: 'dashed', stroke: '#F1FF26' } })
                }
            }
        }
        else {
            creep.findAccu();
        }
    }
};

module.exports = builder;
//  else if (closestSite.progress == closestSite.progressTotal) {
                        // creep.say('Building finished');
                        // creep.immobilia();
                    // }
