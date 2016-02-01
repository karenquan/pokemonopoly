var Main = (function() {

  /* START GAME ------------------
     -display welcome modal
     -display player input (within welcome modal)
     -remove modal when players are done inputting their info
     -player 1 starts, they have to click roll button
     -move player x amount of spaces
      - if they land on a vacant space:
        - update center of board asking if they wanat to purchase - end turn by clicking "YEs" or "No"
      - if they land on their own space:
        - update center of board saying they landed on their own property - end turn by clicking "OK"
      - if they land on other player's property:
        -update center of board saying they landed on other player's property & owe money - end turn by clicking "ok"
      - if they land on GO space, update center of board saying they get $200, & update player's money
      - if they land on jail space, update center of board saying they're just visiting
      - if they land on free parking, check if there's money in jackpot & add money if there is, reduce jackpot to 0, player hits "ok" to continue
      - if they land on go to jail, update player's location to jail - ask user if they want to pay, or else keep track of # of turns to roll values

  */

  /* UTILITIES ------------------
     //create modal
     //remove modal
     //update player location
      //adding color to a cell
      //removing a color from a cell
     //roll die
  */
  function createStartModal() {
    var $modal, $logo, $players, $player1, $player2, $player1Title, $player2Title, $nameText, $characterText, $nameTextBox, $startButton;
    $modal = $('<div />', { 'class': 'start-modal'} );
    $players = $('<div />', { 'class': 'players' });
    $logo = $('<img />', { 'class': 'logo', src: 'images/pokemonopoly.png', alt: 'Pokémonopoly' });
    $nameText = $('<span />', { 'class': 'name', text: 'Name:'});
    $characterText = $('<span />', { 'class': 'character', text: 'Select Your Character:'});
    $nameTextBox = $('<input />', { type: 'text' });
    $player1 = $('<div />', { 'class': 'player-1' });
      $player1Title = $('<h3 />', { text: 'Player 1' });
      $player1.append($player1Title).append($nameText.clone()).append($nameTextBox.clone().addClass('player-1-name')).append($characterText.clone());
      addCharacterIcons($player1);
    $player2 = $('<div />', { 'class': 'player-2' });
      $player2Title = $('<h3 />', { text: 'Player 2' });
      $player2.append($player2Title).append($nameText.clone()).append($nameTextBox.clone().addClass('player-2-name')).append($characterText.clone());
      addCharacterIcons($player2);
    $players.append($player1).append(" ").append($player2);
    $startButton = $('<a />', { text: 'START GAME' });
    $modal.append($logo).append($players).append($startButton);

    function addCharacterIcons(player) {
      var $ash = $('<img />', { 'class': 'ash', src: 'images/ash_gray.png', alt: 'Ash'});
      var $misty = $('<img />', { 'class': 'misty', src: 'images/misty_gray.png', alt: 'Misty'});
      var $brock = $('<img />', { 'class': 'brock', src: 'images/brock_gray.png', alt: 'Brock'});
      player.append($ash).append($misty).append($brock);
    }

    console.log($modal);
    $('body').append($modal);

    // function playerActions() {

    // }
  }

  /* DATA RETRIEVAL ------------------
     Parse xml file to get data to populate cells
  */
  function populateCells() {
    var $cell, $cellElement;
    $cells.each(function(index) {
      cellElement = $('.column-' + this.column + ' div')[this.index];

      switch(this.type.toLowerCase()) { /* create cells based on type */
        case 'go':
          buildGoCell(this, cellElement);
          cellElement.classList.add(this.type.toLowerCase() + '-cell');
          break;
        case 'jail':
          buildJailCell(this, cellElement);
          cellElement.classList.add(this.type.toLowerCase() + '-cell');
          break;
        case 'parking':
          break;
        case 'gotojail':
          break;
        default:
          buildCell(this, cellElement);
          break;
      }
      boardElements.push(cellElement);
      board[this.boardIndex] = this; //also add cell to board array
      // console.log(board);
       // addPropertyOwner('player', $cellElement);
    });
    console.log(boardElements);
  }

  /* BUILD CELL TYPES ------------------
     Build cell based on cell type.
  */
    function buildCell(cell, element) {
      var $cell, $name, $image, $value;
      $cell = $(element);
      $cell.css('border-top', '15px solid ' + cell.color);
      $name = $('<span />', { 'class': 'name', text: cell.name });
      $image = $('<img />', { src: 'images/' + cell.image });
      $value = $('<span />', { 'class': 'value', text: '$' +cell.value });

      if(cell.type.toLowerCase() === 'legendary') {
        var legendaryType = cell.image.split('.')[0];
        $cell.addClass(cell.type.toLowerCase() + '-cell ' + legendaryType);
      } else {
        $cell.addClass(cell.type.toLowerCase() + '-cell ');
      }

      if(cell.type.toLowerCase() === 'property') {
        $city = $('<span />', { 'class': 'city', text: cell.city });
        $cell.append($image).append($name).append($city).append($value);
      } else {
        $cell.append($image).append($name).append($value);
      }
    }

    function buildGoCell(cell, element) {
      var $goCell, $title, $image;
      $goCell = $('<div />');
      $title = $('<span />', { 'class': 'title', text: cell.text });
      $image = $('<img />', { src: 'images/' + cell.image });
      $goCell.append($title).append($image);
      $(element).append($goCell);
    }

    function buildJailCell(cell, element) {
      var $jailCell, $title;
      $jailCell = $(element);
      $jailCell.addClass(cell.type.toLowerCase() + '-cell');
      $title = $('<span />', { 'class': 'title', text: cell.text });
      $jailCell.append($title);
    }

    function buildFreeParkingCell(cell, element) {

    }

    function buildGoToJailCell(cell, element) {

    }
  // END BUILD CELL TYPES ------------------

  /* UPDATE CELL STATE ------------------
     Update cell when player is on a cell or purchases a cell.
  */
  function printCellState(cell) {
    //print current state of cell (i.e. owners, which players on space, name, value...)
  }

  function addPropertyOwner(player, cell) {
    //color will be player.color
    var $owner = $('<span />', { 'class': 'owner', css: { 'background-color': 'pink' } });
    $(cell).append($owner);
  }

  function removePropertyOwner(cell) {
    // cell.remove();
  }

  function addPlayerLocationToCell(player) {
    //change background of cell to player color
    //if two players on cell, gradient of two colors
    //if one player, only one background color
  }

  function removePlayerLocationFromCell(player) {
    //change background color back to white default background
  }
  // END UPDATE CELL STATE ------------------

  function _init() {
    console.log("herro from main");
    populateCells();
    createStartModal();
  }

  /* GLOBAL VARIABLES ------------------

  */
  var $board = $('#board');
  var $column1 = $('.column-1 > div');
  var $column2Top = $('.column-2 > div.top-row');
  var $column2Bottom = $('.column-2 > div.bottom-row');
  var $column3 = $('.column-3 > div');
  var boardElements = [];
  var board = [];

  return {
    init: _init
  }
})();

$(document).ready(function() {
  Main.init();
});

