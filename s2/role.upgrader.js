const roleUpgrader = {
    run: function(creep) {
        if(creep.memory.active) {
            if(creep.carry.energy == 0)
                creep.memory.active = false;
            else 
                if(creep.transfer(creep.room.controller, RESOURCE_ENERGY) ==  ERR_NOT_IN_RANGE) creep.moveTo(creep.room.controller);
            }
        if(!creep.memory.active) {
            if (creep.carry.energy == 50) creep.memory.active = true;
            else {
                let e = creep.pos.findClosestByPath(FIND_SOURCES);
//                let e = creep.room.find(FIND_SOURCES);
                if(creep.harvest(e) == ERR_NOT_IN_RANGE) creep.moveTo(e);
            }
        }
    }
}

module.exports = roleUpgrader;
