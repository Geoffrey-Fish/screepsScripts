
function getBody(segment, room) {
    let body = [];
    let segmentCost = _.sum(segment, s => BODYPART_COST[s]);
    let energyAvailable = room.energyAvailable;
    let maxSegments = Math.floor(energyAvailable / segmentCost);

    _.times(maxSegments, function () {
        _.forEach(segment, s => body.push(s));
    });
    return body;
}


function spawning(room) {


    let spawns = room.find(FIND_MY_STRUCTURES, {
        filter: { structureType: STRUCTURE_SPAWN }
    });

    if (!spawns.length) {
        return;
    }
    //spawns[0].juiceUp();

    let type = _.get(room.memory, ['TYPE'])


    if (type == 'harvester') {
        let number = _.get(room.memory, ['counter']);
        let newName = 'Harvy' + number;
        let result = spawns[0].spawnCreep(getBody([WORK, MOVE], room), newName,
            { memory: { role: 'harvester', home: room } });
        if (result == OK) {
            number++;
            _.set(room.memory,['counter'],number)
            return;
        }

    }

    if (type == 'hauler') {
        let number = _.get(room.memory, ['counter']);
        let newName = 'Hauly' + number;
        let result = spawns[0].spawnCreep(getBody([CARRY, MOVE], room), newName,
            { memory: { role: 'hauler', home: room } });
        if (result == OK) {
            number++;
            _.set(room.memory,['counter'],number)
            return;
        }
    }

    if (type == 'upgrader') {
        let number = _.get(room.memory, ['counter']);
        let newName = 'Uppy' + number;
        let result = spawns[0].spawnCreep(getBody([WORK,CARRY, MOVE], room), newName,
            { memory: { role: 'upgrader', home: room } });
        if (result == OK) {
            number++;
            _.set(room.memory,['counter'],number)
            return;
        }
    }

    if (type == 'builder') {
        let number = _.get(room.memory, ['counter']);
        let newName = 'Bob' + number;
        let result = spawns[0].spawnCreep(getBody([WORK,CARRY, MOVE], room), newName,
            { memory: { role: 'builder', home: room } });
        if (result == OK) {
            number++;
            _.set(room.memory,['counter'],number)
            return;
        }
    }

    if (type == 'repairer') {
        let number = _.get(room.memory, ['counter']);
        let newName = 'Repo' + number;
        let result = spawns[0].spawnCreep(getBody([WORK ,CARRY, MOVE], room), newName,
            { memory: { role: 'repairer', home: room } });
        if (result == OK) {
            number++;
            _.set(room.memory,['counter'],number)
            return;
        }
    }

    if (type == 'wallboy') {
        let number = _.get(room.memory, ['counter']);
        let newName = 'Wallo' + number;
        let result = spawns[0].spawnCreep(getBody([WORK,CARRY,MOVE], room), newName,
            { memory: { role: 'wallboy', home: room } });
        if (result == OK) {
            number++;
            _.set(room.memory,['counter'],number)
            return;
        }
    }

    if (type == 'sattacker') {
        let number = _.get(room.memory, ['counter']);
        let newName = 'Satta' + number;
        let result = spawns[0].spawnCreep(getBody([ATTACK,TOUGH,MOVE], room), newName,
            { memory: { role: 'sattacker', home: room } });
        if (result == OK) {
            number++;
            _.set(room.memory,['counter'],number)
            return;
        }
    }

    if (type == 'lattacker') {
        let number = _.get(room.memory, ['counter']);
        let newName = 'Latta' + number;
        let result = spawns[0].spawnCreep(getBody([RANGED_ATTACK,TOUGH,MOVE, MOVE], room), newName,
            { memory: { role: 'lattacker', home: room } });
        if (result == OK) {
            number++;
            _.set(room.memory,['counter'],number)
            return;
        }
    }

    if (type == 'healer') {
        let number = _.get(room.memory, ['counter']);
        let newName = 'Heal' + number;
        let result = spawns[0].spawnCreep(getBody([HEAL,MOVE,MOVE], room), newName,
            { memory: { role: 'healer', home: room } });
        if (result == OK) {
            number++;
            _.set(room.memory,['counter'],number)
            return;
        }
    }

    //  if (type == 'trucker') {
    //     let number = _.get(room.memory, ['counter']);
    //     let newName = 'Truck' + number;
    //     let result = spawns[0].spawnCreep(getBody([WORK,CARRY, MOVE], room), newName,
    //         { memory: { role: 'trucker', home: room } });
        // if (result == OK) {
        //     number++;
        //     _.set(room.memory,['counter'],number)
        //     return;
        // }
    // }

    // if (type == 'powerdude') {
    //     let number = _.get(room.memory, ['counter']);
    //     let newName = 'dude' + number;
    //     let result = spawns[0].spawnCreep(getBody([WORK,CARRY,MOVE], room), newName,
    //         { memory: { role: 'powerdude', home: room } });
    //  if (result == OK) {
    //     number++;
    //     _.set(room.memory,['counter'],number)
    //     return;
    // }
    // }
}
module.exports = spawning;
