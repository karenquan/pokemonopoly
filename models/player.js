var Player = function(num, name) {
  this.name = name;
  this.num = num;
  switch(num) {
    case 2:
      this.color = '#a44f4f';
      this.currentTurn = false;
      break;
    default:
      this.color = '#4f94a4';
      this.currentTurn = true;
      break;
  }
  this.properties = [];
  this.turnCount = 0;
  this.money = 40;
  this.location = 0; //board array index
  this.inJail = false;
  this.jailRollCount = 0;
};

Player.prototype.addProperty = function(property) {
  this.properties.push(property);
}

Player.prototype.rollDie = function() {
  var roll = generateRandomInt(1,7); //generate random number 1-6
  this.turnCount += 1;

  return roll;

  function generateRandomInt(min, max) {
    return Math.ceil(Math.random() * (max - min));
  }
}

