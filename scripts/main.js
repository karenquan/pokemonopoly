var Main = (function() {

  /* DATA RETRIEVAL ------------------
     Parse xml file to get data to populate cells
  */
  function populateCells() {
    var $cell;
    $cells.each(function(index) {
      switch(this.type.toLowerCase()) { /* create different cell based on type */
        case 'go':
          $cell = buildGoCell(this);
          break;
        case 'jail':
          $cell = buildJailCell(this);
          break;
        case 'free parking':
          break;
        case 'go to jail':
          break;
        case 'attack':
          break;
        case 'ball':
          $cell = buildBallCell(this);
          break;
        default:
          $cell = buildPropertyCell(this);
          break;
      }
      //also add cell to board array
      board[this.boardIndex] = this;

      //column 1: 0-7 index (left)
      switch(this.column) {
        case 2:
          if(this.row === 'top') {
            $column2Top[this.index] = $cell;
          }
          if(this.row === 'bottom') {
            $column2Bottom[this.index] = $cell;
          }
          break;
        default:
          console.log('column: ' + this.column + ' cell: ' + this.index + ' text: ' + this.name );
          console.log($('.column-' + this.column + ' div')[this.index]);
          $($('.column-' + this.column + ' div')[this.index]).append($cell);

          break;
      }

      //column 2: top row: 0-5 indx (top l-> r)
      //column 3: 0-7 index (right)
      //column 2: bottom 5-0 (bottom r->l)
      // $('.column-1 div:first-child').append($cell);
      addPropertyOwner('player', $cell);
    });
    // console.log(board);
  }

  /* BUILD CELL TYPES ------------------
     Build cell based on cell type
  */
    function buildPropertyCell(cell) {
      var $propertyCell, $name, $city, $image, $value;
      $propertyCell = $('<div />', { 'class': cell.type.toLowerCase() + '-cell', css: { 'border-top': '15px solid ' + cell.color } });
      $name = $('<span />', { 'class': 'name', text: cell.name });
      $city = $('<span />', { 'class': 'city', text: cell.city });
      $image = $('<img />', { src: 'images/' + cell.image });
      $value = $('<span />', { 'class': 'value', text: '$' +cell.value });
      $propertyCell.append($image).append($name).append($city).append($value);

      return $propertyCell;
    }

    function buildGoCell(cell) {
      var $goCell, $title;
      $goCell= $('<div />', { 'class': cell.type.toLowerCase() + '-cell' });
      $title = $('<span />', { text: cell.text });
      $goCell.append($title);
      console.log("GO CELL: " + cell.text);
      console.log($goCell);
      return $goCell;
    }

    function buildJailCell(cell) {
      var $jailCell, $title;
      $jailCell= $('<div />', { 'class': cell.type.toLowerCase() + '-cell' });
      $title = $('<span />', { text: cell.text });
      $jailCell.append($title);

      return $jailCell;
    }

    function buildFreeParkingCell(cell) {

    }

    function buildGoToJailCell(cell) {

    }

    function buildAttackCell(cell) {

    }

    function buildBallCell(cell) {
      var $ballCell, $title;
      $ballCell = $('<div />', { 'class': cell.type.toLowerCase() + '-cell' });
      $title = $('<span />', { text: cell.name });
      $ballCell.append($title);

      return $ballCell;
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

