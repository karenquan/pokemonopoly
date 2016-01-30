var Main = (function() {

  /* DATA RETRIEVAL ------------------
     Parse xml file to get data to populate cells
  */
  function populateCells() {
    var $cell;
    $cells.each(function(cell) {
      switch(this.type.toLowerCase()) { /* create different cell based on type */
        case 'go':
          break;
        case 'jail':
          break;
        case 'free parking':
          break;
        case 'go to jail':
          break;
        case 'attack':
          break;
        case 'ball':
          break;
        default:
          $cell = buildPropertyCell(this);
          break;
      }

      $('.column-1 div:first-child').append($cell);
      addPropertyOwner('player', $cell);
    });
  }

  /* BUILD CELL TYPES ------------------
     Build cell based on cell type
  */
    function buildPropertyCell(cell) {
      var $cell, $name, $city, $image, $value;
      $cell = $('<div />', { 'class': cell.type.toLowerCase() + '-cell', css: { 'border-top': '15px solid ' + cell.color } });
      $name = $('<span />', { 'class': 'name', text: cell.name });
      $city = $('<span />', { 'class': 'city', text: cell.city });
      $image = $('<img />', { src: 'images/' + cell.image });
      $value = $('<span />', { 'class': 'value', text: '$' +cell.value });
      $cell.append($image).append($name).append($city).append($value);

      return $cell;
    }

    function buildGoCell(cell) {

    }

    function buildJailCell(cell) {

    }

    function buildFreeParkingCell(cell) {

    }

    function buildGoToJailCell(cell) {

    }

    function buildAttackCell(cell) {

    }

    function buildBallCell(cell) {

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
  var $column1 = $('.column-1');
  var $column2 = $('.column-2');
  var $column3 = $('.column-3');

  return {
    init: _init
  }
})();

$(document).ready(function() {
  Main.init();
});

