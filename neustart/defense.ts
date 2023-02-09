function roomsDefense(room) {

    var towers = room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_TOWER);
        }
    });

    if (towers.length) {
        _.forEach(towers, function (tower) {
            var hostiles = tower.room.find(FIND_HOSTILE_CREEPS);
            if (hostiles.length) {
                room.memory['ALERT'] = true;
                let closestHostile = tower.pos.findClosestByRange(hostiles);
                tower.attack(closestHostile);
            }
            else {
                room.memory['ALERT'] = false;
            }
        });
    }
}
module.exports = roomsDefense;
