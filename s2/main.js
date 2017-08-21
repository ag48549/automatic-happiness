const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const roleRepairer = require('role.repairer');
const cTower = require('c.tower');
const profiler = require('screeps-profiler');


//module.exports.loop = function () {
/* */
profiler.enable();
module.exports.loop = function () {
  profiler.wrap(function () {
/* */

    let hungry = [];
    let roads = [];
    let h = 0;

    var c_mites = 0;
    var c_builders = 0;
    var c_repairers = 0;
    var c_upgraders = 0;

    for(let id in Game.structures) {
        let s = Game.structures[id];
        if(s.structureType == STRUCTURE_TOWER) {
          let target = s.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
          if(target) s.attack(target);
          else if(s.energy > 400) {
            if(!roads[s.room.name]) 
              roads[s.room.name] = s.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_ROAD}}).sort(function(a,b) {return a.hits - b.hits;});
            tower.repair(roads[s.room.name][0]);
          }
        }    
        if(s.hasOwnProperty('energy') && s.energy < s.energyCapacity)
          hungry[h++] = s;
    }
    if((Game.time() % 200) == 0)
      for(let name in Memory.creeps)
        if(!Game.creeps[name]) delete Memory.creeps[name];

    for(let name in Game.creeps) {
      let c = Game.creeps[name];
      if(c.memory.role == 'mite') {
        rMite.run(c,hungry);
        c_mites++;
        continue;
      }
      if(c.memory.role == 'upgrader' {
        roleUpgrader.run(c);
        c_upgraders++;
        continue;
      }
      if(c.memory.role == 'repairer') {
        roleRepairer.run(c);
        c_repairers++;
        continue;
      }
      if(c.memory.role == 'builder') {
        roleBuilder.run(c);
        c_builders++;
        continue;
      }
    }
    
    let i = 0;
    for(let name in Game.spawns) {
      let s = Game.spawns['name'];
      if(c_builders < 1) s.createCreep([MOVE,MOVE,WORK,CARRY], undefined, {role:'builder'});
      if(c_repairers < 2) s.createCreep([MOVE,MOVE,WORK,CARRY], undefined, {role:'repairer'});
      if(c_upgraders < 4) s.createCreep([MOVE, WORK, CARRY]), undefined, {role:'upgrader'});
      if(c_mites < 8) s.createCreep([MOVE,CARRY]), undefined, {role:'mite'});
    }
}
/* */
);
}
