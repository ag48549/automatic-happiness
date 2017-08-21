const cPath = require('c.path');

const roleMite = {
  spawn: function(spawner) {
    const r = spawner.room;
    let i = 0;
    let  n = '';
    do {
      i++;
      n = `m${r.name}${i}`;
    } while(!Game.creeps[n]);
    return spawner.createCreep([CARRY, MOVE],n,{m: '_'}; /* UPDATE PLEASE */
  },

//[gather,spawn,deliver,return] 
  run: function(creep) {
    let j = creep.memory.job;
    if(j < 2) {
      if(j == 0) { //gather
        let target = Game.getObjectById(creep.memory.source);
        if(creep.isNearTo(target) {
          j = 1; //return to spawn
          creep.memory.job = 1;
        }
        else {
          
        

  }
