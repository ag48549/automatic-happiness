const roleRepairer = {
    run: function(creep) {
        if(creep.memory.active) {
            if(creep.carry.energy == 0) 
                creep.memory.active = false;
            let o = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: s => s.hits < s.hitsMax});
            if(!o) creep.moveTo(Game.flags['idle']);
            else 
                if(creep.repair(o) == ERR_NOT_IN_RANGE) creep.moveTo(o);
        }
        if(!creep.memory.active) {
            if (creep.carry.energy == 50) creep.memory.active = true;
            else {
                let e = creep.pos.findClosestByPath(FIND_SOURCES)
                if(creep.harvest(e) == ERR_NOT_IN_RANGE) creep.moveTo(e);
            }
        }
    }
}

module.exports = roleRepairer;
