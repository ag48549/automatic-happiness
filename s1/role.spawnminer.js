const roleSpawnMiner = {
    run: function(creep) {
        if(creep.carry.energy < creep.carryCapacity) {
            if(creep.harvest(Game.getObjectById('5982ff2cb097071b4adc233c')) == ERR_NOT_IN_RANGE) creep.moveTo(Game.getObjectById('5982ff2cb097071b4adc233c'));
        }
        else if(creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(Game.spawns['Spawn1']); 
    }
}


module.exports = roleSpawnMiner;