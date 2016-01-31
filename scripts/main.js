var Main = (function() {

  /* DATA RETRIEVAL ------------------
     Parse xml file to get data to populate cells
  */
  function populateCells() {
    var $cell, $cellElement;
    $cells.each(function(index) {
      $cellElement = $('.column-' + this.column + ' div')[this.index];
      console.log('.column-' + this.column + ' div');

      switch(this.type.toLowerCase()) { /* create different cell based on type */
        case 'go':
          buildGoCell(this, $cellElement);
          break;
        case 'jail':
          buildJailCell(this, $cellElement);
          break;
        case 'parking':
          break;
        case 'gotojail':
          break;
        case 'attack':
          break;
        case 'legendary':
          break;
        case 'ball':
          buildBallCell(this, $cellElement);
          break;
        default:
          // $cell = buildPropertyCell(this, $cellElement);
          buildPropertyCell(this, $cellElement);
          break;
      }
      //also add cell to board array
      board[this.boardIndex] = this;

      //column 1: 0-7 index (left)
      // switch(this.column) {
      //   case 2:
      //     if(this.row === 'top') {
      //       $column2Top[this.index] = $cell;
      //     }
      //     if(this.row === 'bottom') {
      //       $column2Bottom[this.index] = $cell;
      //     }
      //     break;
      //   default:
      //     console.log('column: ' + this.column + ' cell: ' + this.index + ' text: ' + this.name );
      //     console.log($('.column-' + this.column + ' div')[this.index]);
      //     $($('.column-' + this.column + ' div')[this.index]).append($cell);

      //     break;
      // }

      // addPropertyOwner('player', $cell);
    });
    // console.log(board);
  }

  /* BUILD CELL TYPES ------------------
     Build cell based on cell type
  */
    function buildPropertyCell(cell, element) {
      var $propertyCell, $name, $city, $image, $value;
      $propertyCell = $(element);
      $propertyCell.addClass(cell.type.toLowerCase() + '-cell');
      $propertyCell.css('border-top', '15px solid ' + cell.color);
      $name = $('<span />', { 'class': 'name', text: cell.name });
      $city = $('<span />', { 'class': 'city', text: cell.city });
      $image = $('<img />', { src: 'images/' + cell.image });
      $value = $('<span />', { 'class': 'value', text: '$' +cell.value });
      $propertyCell.append($image).append($name).append($city).append($value);
    }

    function buildGoCell(cell, element) {
      var $goCell, $title;
      $goCell = $(element);
      $goCell.addClass(cell.type.toLowerCase() + '-cell');
      $title = $('<span />', { text: cell.text });
      $goCell.append($title);
    }

    function buildJailCell(cell, element) {
      var $jailCell, $title;
      $jailCell = $(element);
      $jailCell.addClass(cell.type.toLowerCase() + '-cell');
      $title = $('<span />', { text: cell.text });
      $jailCell.append($title);
    }

    function buildFreeParkingCell(cell) {

    }

    function buildGoToJailCell(cell) {

    }

    function buildAttackCell(cell) {

    }

    function buildBallCell(cell, element) {
      var $ballCell, $title;
      $ballCell = $(element);
      $ballCell.addClass(cell.type.toLowerCase() + '-cell');
      $title = $('<span />', { text: cell.name });
      console.log($ballCell);
      $ballCell.append($title);
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
  }

  /* GLOBAL VARIABLES ------------------

  */
  var $board = $('#board');
  var $column1 = $('.column-1 > div');
  var $column2Top = $('.column-2 > div.top-row');
  var $column2Bottom = $('.column-2 > div.bottom-row');
  var $column3 = $('.column-3 > div');
  var board = [];

  return {
    init: _init
  }
})();

$(document).ready(function() {
  Main.init();
});

