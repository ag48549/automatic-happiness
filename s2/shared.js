const shared = {
  var eneeders = [];
  var ewanters = [];
  var eneeded = [];
  var ewanted = [];

  needEnergy: function(room) {
    if(!eneeded[room.name]) {
      eneeded[room.name] = true;
      eneeders[room.name] = room.find(FIND_MY_STRUCTURES, {filter: s =>
          s.energy == 0 && (s.structureType == STRUCTURE_SPAWN ||
          s.structureType == STRUCTURE_EXTENSION ||
          s.structureType == STRUCTURE_TOWER)});
    }
    return eneeders[room.name];
  };

  wantEnergy: function(room) {
    if(!ewanted[room.name]) {
      ewanted[room.name] = true;
      const temp = room.find(FIND_MY_STRUCTURES, {filter: s =>
          s.energy < s.energyCapacity});
      ewanters[room.name] = temp.concat(room.find(FIND_MY_CREEPS, {filter: c =>
          s.energy == 0 && (s.memory.role == 'upgrader' || s.memory.role == 'builder')}));
    }
    return ewanters[room.name];
  };
}

module.exports = shared;
