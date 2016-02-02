var Player = function(num, name) {
  this.name = name;
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
      this.color = '#de756e';
      this.currentTurn = false;
      break;
    default:
      this.color = '#58a8da';
      this.currentTurn = true;
      break;
  }
  this.property = [];
  this.money = 2000;
  this.location = 0; //board array index
  this.jail = false;
};

Player.prototype.addProperty = function(property) {
  this.property.push(property);
}
