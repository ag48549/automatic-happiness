const shared = require('shared');

const roleDrone = {
  parts: [CARRY, MOVE, CARRY, MOVE],
  cost:  [200, 200, 100],

  spawn: function(spawner) {
    const countDrones = require('config');
    const r = spawner.room;
    for(let i = 1; i < countDrones; i++) {
      const n = 'dr${r.name}{$i}';
      if(!Game.creeps[n]) 
        for(let x = 0; x < cost; x++)
	 if(cost[x] <= room.energyAvailable)
           return spawner.createCreep(parts.slice(x,4),n,{role:'drone',job:'idle',source:null,dest:null});
    }
  },

  run: function(creep) {
    switch(creep.memory.job) {
      case 'idle':
        if(creep.carry.energy == creep.carryCapacity) {
          let d = findTarget(creep);
          if(d) {
            creep.memory.dest = d.id;
            creep.memory.job = 'deliver';
            creep.moveTo(d);
          }
          break;
        }
        const p = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
        if(p) {
          creep.memory.source = p.id;
          creep.moveTo(p);
          break;
        }
      case 'gather':
        let e = creep.pos.findInRange(FIND_DROPPED_ENERGY,1);
        if(e) {
	  creep.pickup(e[0]);
          if(creep.carry.energy == creep.carryCapacity) {
            let d = findTarget(creep);
            if(d) {
              creep.memory.dest = d.id;
              creep.memory.job = 'deliver';
            }
            else 
              creep.memory.job = 'idle';
          }
          break;
        } 
      case 'traded':
        let s = Game.getObjectByID(creep.memory.source);
        if(!s) {
          s = creep.pos.findClosestByPath(FIND_SOURCES, {algorithm:'astar'});
          creep.memory.source = s.id;
        }
        creep.moveTo(s);
        creep.memory.job = 'gather';
        break;
      case 'deliver':
        let d = Game.getObjectById(creep.memory.dest);
        if(!d) 
          d = findTarget(Creep);
        if(!d) {
          if(creep.carry.energy < creep.carryCapacity) {
            creep.memory.job = 'gather';
            creep.moveTo(Game.getObjectById(creep.memory.source));
          }
          else
            creep.memory.job = 'idle';
        break;
        }
        if(creep.transfer(d, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          const near = creep.pos.findInRange(FIND_MY_CREEPS, {filter: x =>
              x.memory.role == 'drone' && x.memory.job == 'gather'})[0];
          if(near) {
            near.memory.job = 'deliver';
            creep.memory.job = 'traded';
            near.memory.dest = creep.memory.dest;
            creep.transfer(near, RESOURCE_ENERGY);
            break;
          }
          creep.moveTo(d);
        }
        if(creep.carry.energy == 0) creep.memory.job = 'gather';
        break;
    }
  },
        
  findTarget: function(creep) {
    let needs = shared.needEnergy(creep.room);
    if(!needs)
      needs = shared.wantEnergy(creep.room); 
    if(needs) 
      return creep.pos.findClosestByRange(needs);
    return null;
  }
}

module.exports = roleDrone;
