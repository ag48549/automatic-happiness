var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleSpawnMiner = require('role.spawnminer');
var roleRepairer = require('role.repairer');
const roleEMiner = require('role.eminer');
const roleDrone = require('role.drone');

const totalbuilders = 1;
const totalrepairers = 4;
const totalupgraders = 8;
//const totalspawnminers = 0;


module.exports.loop = function () {
    var c_builder = 0;
    var c_upgrader = 0;
    var c_repairer = 0;
//    var c_spawnminer = 0;
    for(let c in Memory.creeps) {
        if(!Game.creeps[c]) {
            delete Memory.creeps[c];
            continue;
        }
        let r = Game.creeps[c];
        switch(r.memory.role) {
            case 'upgrader': roleUpgrader.run(r); c_upgrader += 1; break;
            case 'builder': roleBuilder.run(r); c_builder += 1; break;
            case 'repairer': roleRepairer.run(r); c_repairer += 1; break;
            case 'drone': roleDrone.run(r); break;
            case 'eminer':roleEMiner.run(r); break;
            default: roleSpawnMiner.run(r); c_spawnminer += 1;
        }
//        if(r.memory.role == 'upgrader') roleUpgrader.run(r);
    }
    roleEMiner.spawn(Game.spawns[Spawn1]);
    roleDrone.spawn(Game.spawns[Spawn1]);
    if(c_builder < totalbuilders) Game.spawns['Spawn1'].createCreep([WORK,CARRY,WORK,MOVE], undefined, {role:'builder'});
    if(c_repairer < totalrepairers) Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE,MOVE], undefined, {role:'repairer'});
    if(c_upgrader < totalupgraders) Game.spawns['Spawn1'].createCreep([WORK,CARRY,WORK,MOVE], undefined, {role:'upgrader'});
    if(c_spawnminer < totalspawnminers) Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,MOVE]);
}
