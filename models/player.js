var Player = function(num, name) {
  this.name = name;
  this.num = num;
  // this.character = character;
  // this.image = 'images/';
  // switch(this.character) {
  //   case 'ash':
  //     this.color = 'rgb(248,9,26)';
  //     this.image += 'ash.png';
  //     break;
  //   case 'misty':
  //     this.color = 'rgb(255,160,63)';
  //     this.image += 'misty.png';
  //     break;
  //   case 'brock':
  //     this.color = 'rgb(89,68,37)';
  //     this.image += 'brock.png';
  //     break;
  // };
  switch(num) {
    case 2:
      this.color = '#cc0000';
      this.currentTurn = false;
      break;
    default:
      this.color = '#3b82c4';
      this.currentTurn = true;
      break;
  }
  this.properties = [];
  this.turnCount = 0;
  this.money = 2000;
  this.location = 0; //board array index
  this.inJail = false;
  this.jailRollCount = 0;
};

Player.prototype.addProperty = function(property) {
  this.properties.push(property);
}

Player.prototype.rollDie = function() {
  //generate random number 1-6
  var roll = generateRandomInt(1,7);
  this.turnCount += 1;

  return roll;

  function generateRandomInt(min, max) {
    return Math.ceil(Math.random() * (max - min));
  }
}

