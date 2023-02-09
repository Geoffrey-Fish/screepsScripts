Creep.prototype.harvestEnergy = function harvestEnergy() {
    if (!this.memory.sourceId) {
        this.sourceChoice();
    }
    let storedSource = Game.getObjectById(this.memory.sourceId);
    if (this.pos.isNearTo(storedSource)) {
        this.harvest(storedSource);

    }
    else {
        this.moveTo(storedSource, { visualizePathStyle: { lineStyle: 'solid',stroke: '#FFFFFF' } });
    }
}

Creep.prototype.sourceChoice = function sourceChoice() {
    let source = this.room.find(FIND_SOURCES);
    if (source.length >= 1) {

        let ones = source[0].pos.getOpenPositions();
        let twos = source[1].pos.getOpenPositions();

        if (ones.length) {
            this.memory.sourceId = source[0].id;
        }
        else if (twos.length) {
            this.memory.sourceId = source[1].id;
        }
        else {
        this.moveTo(Game.flags.waiting)
         }
    }
    else {
        this.memory.sourceId = source[0].id;
    }
}

Creep.prototype.spotting = function spotting() {

    let dropSpot = _.get(this.room.memory, ['openDrops'])
    if (dropSpot.length == 0) {
        this.newSpots();
        return;
    }
    this.memory.spot = dropSpot.shift();
    _.set(this.room.memory, ['openDrops'], dropSpot);

}

Creep.prototype.newSpots = function newSpots() {

    let droppedEnergy = this.room.find(FIND_DROPPED_RESOURCES, {
        filter: (resource) => resource.resourceType == RESOURCE_ENERGY
    });
    let dropArray = [];

    for (i = 0; i < droppedEnergy.length; i++) {
        dropArray.push(droppedEnergy[i].id)

        _.set(this.room.memory, ['openDrops'], dropArray);
    }
}

Creep.prototype.drops = function drops() {
    let drop = Game.getObjectById(this.memory.spot);
    if (drop == null) {
        this.spotting();
    }
    if (this.pos.isNearTo(drop)) {
        this.pickup(drop);
    }
    else {
        this.moveTo(drop,{ visualizePathStyle: {lineStyle: 'dashed', stroke: '#330066' } });
    }
}


Creep.prototype.findAccu = function findAccu() {

    let accus = this.room.find(FIND_STRUCTURES, {
        filter: (struct) => {
            return (
                struct.structureType == STRUCTURE_EXTENSION ||
                struct.structureType == STRUCTURE_CONTAINER ||
                struct.structureType == STRUCTURE_LINK ||
                struct.structureType == STRUCTURE_STORAGE) &&
                struct.store[RESOURCE_ENERGY] > 0;
        }
    });
    if (accus.length) {
        let closestAccu = this.pos.findClosestByRange(accus);
        if (this.pos.isNearTo(closestAccu)) {
            this.withdraw(closestAccu, RESOURCE_ENERGY);
        }
        else {
            this.moveTo(closestAccu, { visualizePathStyle: {lineStyle: 'dotted', stroke: '#FF007F' } });
        }
    }
    else {
        this.moveTo(Game.flags.waiting);
    }
}
Creep.prototype.refill = function refill() {
    let stores = this.room.find(FIND_STRUCTURES, {
        filter: (struct) => {
            return (
                struct.structureType == STRUCTURE_CONTAINER ||
                struct.structureType == STRUCTURE_SPAWN ||
                struct.structureType == STRUCTURE_EXTENSION ||
                struct.structureType == STRUCTURE_TOWER ||
                struct.structureType == STRUCTURE_LINK ||
                struct.structureType == STRUCTURE_STORAGE) &&
                struct.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
        }
    });

    if (stores.length) {
        let closestStore = this.pos.findClosestByPath(stores);
        if (this.pos.isNearTo(closestStore)) {
            this.transfer(closestStore, RESOURCE_ENERGY);
        }
        else {
            this.moveTo(closestStore, { visualizePathStyle: {lineStyle: 'solid', stroke: '#CC0000' } });
        }
    }
    // else {
    //     let contis = this.room.find(FIND_STRUCTURES, {
    //     filter: (struct) => {
    //         return (
    //             struct.structureType == STRUCTURE_CONTAINER
    //            ) &&
    //             struct.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
    //     }
    //     });
    //     if (contis.length) {
    //         let closestConti = this.pos.findClosestByPath(contis);
    //          if (this.pos.isNearTo(closestConti)) {
    //         this.transfer(closestConti, RESOURCE_ENERGY);
    //         }
    //         else {
    //             this.moveTo(closestConti, { visualizePathStyle: {lineStyle: 'solid', stroke: '#CC0000' } });
    //         }
    //     }
    // }
}
//////////////////////////////////////////////////////
Creep.prototype.immobilia = function immobilia() {


    let towers = this.room.find(FIND_STRUCTURES, {
        filter: (struct) => {
            return (struct.structureType == STRUCTURE_TOWER);
        }
    });
    let towersPos = _.forEach(towers, (tower) => { return tower.pos })

    let contis = this.room.find(FIND_STRUCTURES, {
        filter: (struct) => {
            return (struct.structureType == STRUCTURE_CONTAINER);
        }
    });
    let contisPos = _.forEach(contis, (conti) => { return conti.pos });

    let exis = this.room.find(FIND_STRUCTURES, {
        filter: (struct) => {
            return (struct.structureType == STRUCTURE_EXTENSION);
        }
    });
    let exisPos = _.forEach(exis, (exi) => { return exi.pos });


    let links = this.room.find(FIND_STRUCTURES, {
        filter: (struct) => {
            return (struct.structureType == STRUCTURE_LINK);
        }
    });
    if (links.length >=1) {
        let LinksPos = _.forEach(links, (link) => { return link.pos });
            _.set(this.room.memory,['immobilia', 'linklist'], LinksPos);
    }
    let spawns = this.room.find(FIND_STRUCTURES, {
        filter: (struct) => {
            return (struct.structureType == STRUCTURE_SPAWN);
        }
    });
    let spawnsPos = _.forEach(spawns, (spawn) => { return spawn.pos });

    let storage = this.room.find(FIND_STRUCTURES, {
        filter: (struct) => {
            return (struct.structureType == STRUCTURE_STORAGE);
        }
    });
    if (storage.length == 1) {
        let storagePos = storage[0].pos;
        _.set(this.room.memory,['immobilia', 'storagelist'], storagePos);

    }
    let source = this.room.find(FIND_SOURCES);
    let sourcePos = _.forEach(source, (sourc) => { return sourc.pos });

    _.set(this.room.memory,['immobilia', 'towerlist'], towersPos);
    _.set(this.room.memory,['immobilia', 'contilist'], contisPos);
    _.set(this.room.memory,['immobilia', 'exislist'], exisPos);
    _.set(this.room.memory,['immobilia', 'spawnlist'], spawnsPos);
    _.set(this.room.memory,['immobilia', 'sources'], sourcePos);

}

Creep.prototype.seppuku = function seppuku() {

    let spawns = this.room.find(FIND_STRUCTURES, {
        filter: (struct) => {
            return (struct.structureType == STRUCTURE_SPAWN)
        }
    });

    if (this.room.memory['Alert'] == true) {
        console.log('BANZAI!!!');

        if (this.pos.isNearTo(spawns[0])) {
            spawns[0].recycleCreep(this);
        }
        else {
            this.moveTo(spawns[0]);
        }
    }
    else {
        return
    }
}
