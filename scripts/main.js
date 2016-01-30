var Main = (function() {

  /* DATA RETRIEVAL ------------------
     Parse xml file to get data to populate cells
  */
  function populateCells() {
    var $cell, $name, $city, $image, $value;
    $cells.each(function(cell) {
      $cell = $('<div />', { 'class': this.type.toLowerCase() + '-cell', css: { 'border-top': '15px solid ' + this.color } });
      $name = $('<span />', { 'class': 'name', text: this.name });
      $city = $('<span />', { 'class': 'city', text: this.city });
      $image = $('<img />', { src: 'images/' + this.image });
      $value = $('<span />', { 'class': 'value', text: '$' +this.value });
      $cell.append($image).append($name).append($city).append($value);
      $('.column-1 div:first-child').append($cell);
      console.log($cell);
    });
  }

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

