var Player = function(name, character) {
  this.name = name;
  this.character = character;
  this.image = 'imaages/';
  switch(this.character) {
    case 'ash':
      this.color = 'rgb(248,9,26)';
      this.image += 'ash.png';
      break;
    case 'misty':
      this.color = 'rgb(255,160,63)';
      this.image += 'misty.png';
      break;
    case 'brock':
      this.color = 'rgb(89,68,37)';
      this.image += 'brock.png';
      break;
  };
  this.pokemon = [];
  this.money = 2000;
  this.location = 0;
  this.jail = false;
};
