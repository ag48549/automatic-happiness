const roleBuilder = {
    spawn: function(room, queue) {
      for(let i = 1; i < 100; i++)
	if(!Game.creeps['builder${i}'])
	  queue.push([room,'builder${i}',[WORK,CARRY,MOVE],{role:'builder', active: false}]);
    };

    run: function(creep) {
        if(creep.memory.active) {
            let o = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES);
            if(!o) creep.moveTo(Game.flags['idle']);
            if(creep.carry.energy == 0)
                creep.memory.active = false;
            else 
                if(creep.build(o) == ERR_NOT_IN_RANGE) creep.moveTo(o);
        }
        if(!creep.memory.active) {
            if (creep.carry.energy == 50) creep.memory.active = true;
            else {
                let e = creep.pos.findClosestByPath(FIND_SOURCES)
                if(creep.harvest(e) == ERR_NOT_IN_RANGE) creep.moveTo(e);
            }
        }
    };
};

module.exports = roleBuilder;
