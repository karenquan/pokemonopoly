var Main = (function() {

  /* GAME PLAY ------------------
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
    function startGame() {
      //grab player names before removing modal
      player1 = new Player(1, $('.player-1-name').val());
      player2 = new Player(2, $('.player-2-name').val());
      $('.start-modal').remove();
      buildInitializeTurnSection();
      buildInitializePlayerInfoSections();
    }
  // END GAME PLAY ------------------


  /* START MODAL ------------------

  */
    function displayStartModal() {
      var $startModal, $content, $logo, $players, $player1, $player2, $player1Title, $player2Title, $nameText, $characterText, $nameTextBox, $startButton;

      // buildStartModal();
      // $('body').append($startModal);
      $('body').append(buildStartModal());
      activateStartButtonEvents(); //activate start button after modal is added to dom

      function buildStartModal() {
        $startModal = $('<div />', { 'class': 'start-modal'} );
        $content = $('<div />', { 'class': 'modal-content' });
        $players = $('<div />', { 'class': 'players' });
        $logo = $('<img />', { 'class': 'logo', src: 'images/pokemonopoly.png', alt: 'Pokémonopoly' });
        $nameText = $('<span />', { 'class': 'name', text: 'Name: '});
        // $characterText = $('<span />', { 'class': 'character', text: 'Select Your Character: '});
        $nameTextBox = $('<input />', { type: 'text' });
        $player1 = $('<div />', { 'class': 'player-1' });
          $player1Title = $('<h3 />', { text: 'Player 1' });
          $player1.append($player1Title).append($nameText.clone()).append($nameTextBox.clone().addClass('player-1-name'));
          // addCharacterIcons($player1, 1);
        $player2 = $('<div />', { 'class': 'player-2' });
          $player2Title = $('<h3 />', { text: 'Player 2' });
          $player2.append($player2Title).append($nameText.clone()).append($nameTextBox.clone().addClass('player-2-name'));
          // addCharacterIcons($player2, 2);
        $players.append($player1).append(' ').append($player2);
        $startButton = $('<a />', { 'class': 'start-button disabled', text: 'START GAME' });
        $content.append($logo).append($players).append($startButton);
        $startModal.append($content);
        // console.log($startModal);

        return $startModal;
      }

      function addCharacterIcons(player, playerNumber) {
        var ashId = 'ash-' + playerNumber;
        var mistyId = 'misty-' + playerNumber;
        var brockId = 'brock-' + playerNumber;
        var radioName = playerNumber + ' character';
        var $ash = $('<input />', { type: 'radio', name: 'ash', value: 'ash', id: ashId });
        var $ashLabel = $('<label />', { 'class': ashId, 'for': ashId });
        var $misty = $('<input />', { type: 'radio', name: 'misty', value: 'misty', id: mistyId });
        var $mistyLabel = $('<label />', { 'class': mistyId, 'for': mistyId });
        var $brock = $('<input />', { type: 'radio', name: 'brock', value: 'brock', id: brockId });
        var $brockLabel = $('<label />', { 'class': brockId, 'for': brockId });
        player.append($ash).append($ashLabel).append($misty).append($mistyLabel).append($brock).append($brockLabel);
      }

      function activateStartButtonEvents() {
        var $player1Name = $('.player-1-name').val();
        var $player2Name = $('.player-2-name').val();

        $('input[type="text"]').on('change', function() {
          if(checkPlayerInput()) {
            attachStartButtonClick();
          } else {
            removeStartButtonClick();
          }
        });

        //only allow start button to be clicked when both players have typed their name
        $('input[type="text"]').on('keypress keyup', function() {
          if(checkPlayerInput()) {
            $startButton.removeClass('disabled');
          } else {
            $startButton.addClass('disabled');
          }
        });
      }

      function checkPlayerInput() {
        return ($('.player-1-name').val().length > 0 && $('.player-2-name').val().length > 0) ? true : false;
      }

      function attachStartButtonClick () {
        $startButton.on('click', function() {
          startGame();
        });
      }

      function removeStartButtonClick() {
        $startButton.unbind('click');
      }
  }
  // END START MODAL ------------------

  /* DATA RETRIEVAL ------------------
     Read cells.js file to get data to populate cells.
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
    // console.log(boardElements);
    }
  // END DATA RETRIEVAL ------------------

  /* BUILD DYNAMIC ELEMENTS ------------------

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

    function buildInitializePlayerInfoSections() {
      var $playerInfo, $player1Info, $player2Info, $name, $property, $money;
      $playerInfoSection = $('<div />', { 'class': 'player-info' });
      for(var i = 1; i < 3; i++) {
          var player = i == 1 ? player1 : player2;
          var $playerInfo = $('<div />', { 'class': 'player-' + i + '-info' });
          $name = $('<h1 />', { text: 'Player ' + i + ': ' }).append($('<span />', { 'class': 'name', text: player.name }));
          $property = $('<div />', { 'class': 'property' }).append($('<h2 />', { text: 'Property' })).append('<ul>');
          $money = $('<h2 />', { text: '$' + player.money });
          $playerInfo.append($name).append($property).append($money);
          if(i == 1) {
            $playerInfoSection.append($playerInfo).append(' '); //need to add space for justify effect
          } else {
            $playerInfoSection.append($playerInfo);
          }
      }
      $('.board-center').append($playerInfoSection);
    }

    function buildInitializeTurnSection() {
      currentPlayer = player1;
      var $turnInfo = $('<div />', { 'class': 'turn-info' });
      var $title = $('<h1 />', { text: 'Turn: ' }).append($('<span />', { 'class': 'player-turn-name', text: currentPlayer.name }));
      $turnInfo.append($title);
      $('.board-center').append($turnInfo);
    }

  // END BUILD DYNAMIC ELEMENTS ------------------

  /* UPDATE BOARD STATE (CELLS & CENTER) ------------------
     Update board center content for every turn.
     Update cell when player is on a cell or purchases a cell.
  */
    function updateTurnSection() {
      currentPlayer = player1.currentTurn === true ? player1 : player2;
      $('.turn-info .player-turn-name').text(currentPlayer.name);
    }

    function updatePlayerInfoSection() {

    }

    function addPropertyOwner(player, cell) {
      //color will be player.color
      var $owner = $('<span />', { 'class': 'owner', css: { 'background-color': player.color } });
      $(cell).append($owner);
    }

    function removePropertyOwner(cell) { //if user sells property
      // cell.remove();
    }

    function movePlayer(player, numOfSpaces) {
      //get current location of player (board array index)
      //change background of cell to player color
      //if two players on cell, gradient of two colors
      //if one player, only one background color
    }

    function updateCellState(cell) {
      //change background color back to white default background
      //if no player is on it
    }

    function printCellState(cell) {
      //print current state of cell (i.e. owners, which players on space, name, value...)
    }
    // END UPDATE BOARD STATE ------------------

    function _init() {
      populateCells();
      displayStartModal();
    }

  /* GLOBAL VARIABLES ------------------

  */
  var $board = $('#board');
  var $boardLeft = $('.column-1 > div');
  var $boardTop = $('.column-2 > div.top-row');
  var $boardRight = $('.column-3 > div');
  var $boardBottom = $('.column-2 > div.bottom-row');
  // var $startModal;
  // var $turnSection = $('.turn-info');
  // var $playerInfoSection = $('.player-info');
  var board = [];
  var boardElements = [];
  var player1;
  var player2;
  var currentPlayer;

  return {
    init: _init
  }
})();

$(document).ready(function() {
  Main.init();
});

