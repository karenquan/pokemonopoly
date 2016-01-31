var Main = (function() {

  /* DATA RETRIEVAL ------------------
     Parse xml file to get data to populate cells
  */
  function populateCells() {
    var $cell, $cellElement;
    $cells.each(function(index) {
      $cellElement = $('.column-' + this.column + ' div')[this.index];

      switch(this.type.toLowerCase()) { /* create cells based on type */
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
        default:
          buildCell(this, $cellElement);
          break;
      }

      board[this.boardIndex] = this; //also add cell to board array
      // console.log(board);
       // addPropertyOwner('player', $cellElement);
    });
  }

  /* BUILD CELL TYPES ------------------
     Build cell based on cell type
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

