const roleEMiner = {
  parts: [WORK, WORK, WORK, WORK, WORK, MOVE];
  cost:  [550, 450, 350, 250];

  spawn: function(spawner) {
    const r = spawner.room
    const s = r.find(FIND_SOURCES);
    for(let i of s) {
      const n = 'em${r.name}${i.pos.x}${i.pos.y}';
      if(!Game.creeps[n]) 
        for(const x in cost)
          if(cost[x] <= r.energyAvailable)
            return spawner.createCreep(parts.slice(x,6),n,{role:'eminer',target:i.id});
     }
     return ERR_NOT_ENOUGH_ENERGY;
  };
       
  run: function(creep) {
    const s = Game.getObjectByID(creep.memory.target);
    if(!s) creep.suicide();
    if(creep.harvest(s) == ERR_NOT_IN_RANGE) creep.moveTo(s);
  };
}


module.exports = roleEMiner;
