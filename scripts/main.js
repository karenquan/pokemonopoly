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
      players = [player1, player2];
      currentPlayer = player1;
      turnCount = 0;
      $('.start-modal').remove();
      movePlayer(player1, 0); //start player 1 on 'Go' space
      movePlayer(player2, 0); //start player 1 on 'Go' space
      buildPlayerInfoSections(); //build player info section before turn section for it to appear in the correct spot
      buildTurnSection();
    }

    function switchTurns() {
      $('.roll-button').attr('disabled', false); //re-enable roll button
      currentPlayer.currentTurn = false;
      // turnCount += 1;
      // currentPlayer = (turnCount % 2 == 0) ? player1 : player2;
      currentPlayer = (currentPlayer === player1) ? player2 : player1;
      currentPlayer.currentTurn = true;
      updateTurnSection();
    }

    function render() {
      //update turn section (roll #, roll image(s))
      //update player info
    }

  // END GAME PLAY ------------------


  /* START MODAL ------------------

  */
    function displayStartModal() {
      var $startModal, $content, $logo, $players, $player1, $player2, $player1Title, $player2Title, $nameText, $characterText, $nameTextBox, $startButton;

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
        // $startButton = $('<a />', { 'class': 'start-button disabled', text: 'START GAME' });
        $startButton = $('<button />', { 'class': 'start-button disabled', text: 'START GAME' });
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

        attachStartButtonClick();
        $startButton.attr('disabled', true);

        //only allow start button to be clicked when both players have typed their name
        $('input[type="text"]').on('keypress keyup', function() {
          if(checkPlayerInput()) {
            $startButton.removeClass('disabled');
            $startButton.attr('disabled', false);
          } else {
            $startButton.addClass('disabled');
            $startButton.attr('disabled', true);
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
    });

    /*
      after all elements are pushed on boardElements array,
      need to rearrange column 4 in boardElements array since
      they get pushed in reverse order
    */
    var lastRow = [];
    for(var i = 1; i < 7; i++) {
      lastRow.push(boardElements.pop());
    }
    lastRow.forEach(function(element) {
      boardElements.push(element);
    });
    //console.log(board);
    //console.log(boardElements);
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

    function buildPlayerInfoSections() {
      var $playerInfo, $player1Info, $player2Info, $name, $properties, $money;
      $playerInfoSection = $('<div />', { 'class': 'player-info' });
      for(var i = 1; i < 3; i++) {
          var player = i == 1 ? player1 : player2;
          var $playerInfo = $('<div />', { 'class': 'player-' + i + '-info' });
          $name = $('<h1 />', { text: 'Player ' + i + ': ' }).append($('<span />', { 'class': 'name', text: player.name }));
          $properties = $('<div />', { 'class': 'properties' }).append($('<h2 />', { text: 'Properties' })).append($('<ul />', { 'class': 'properties-list' }));
          $money = $('<h2 />', { 'class': 'money', text: '$' + player.money });
          $playerInfo.append($name).append($money).append($properties);
          if(i == 1) {
            $playerInfoSection.append($playerInfo).append(' '); //need to add space for justify effect
          } else {
            $playerInfoSection.append($playerInfo);
          }
      }
      $('.board-center').prepend($playerInfoSection);
    }

    function buildTurnSection() {
      // currentPlayer = player1;
      var $turnInfo = $('<div />', { 'class': 'turn-info' });
      var $title = $('<h1 />', { 'class': 'turn-title', text: 'Turn: ' }).append($('<span />', { 'class': 'player-turn-name', text: currentPlayer.name }));
      $title.css('color', currentPlayer.color);

      var $roll = $('<div />', { 'class': 'roll' });
        var $rollTitle = $('<h2 />', { text: 'Roll' });
        var $rollValue = $('<span />', { 'class': 'roll-value', text: ' ' });
        var $rollImage = $('<img />', { src: 'images/dice.gif' } );
        $rollButton = $('<button />', { 'class': 'roll-button', text: 'ROLL' });
        // $roll.append($rollTitle).append($rollValue).append($rollImage).append($rollButton);
        $roll.append($rollTitle).append($rollValue).append($rollButton);

      var $cellInfo = $('<div />', { 'class': 'cell-info' });
        var $cellTitle = $('<h2 />', { text: 'Current Space' });
        $cellTitle.css('color', currentPlayer.color);
        var $cellDetails = $('<div />', { 'class': 'cell-details' });
        var $cellName = $('<h3 />', { text: 'Name: ' }).append($('<span />', { 'class': 'name', text: 'Go' }));
        var $cellValue = $('<h3 />', { 'class': 'value' });
        var $cellImage = $('<img />', { src: 'images/go.png' });
        $cellDetails.append($cellName).append($cellValue);
        $cellInfo.append($cellTitle).append($cellImage).append(' ').append($cellDetails);

      $turnInfo.append($title).append($roll).append(' ').append($cellInfo);
      $('.board-center').prepend($turnInfo);
      attachRollEvent();

      $rollButton = $('.roll-button');//update rollButton value to newly added dom element

      function attachRollEvent() {
        $rollButton.on('click', function() {
          $rollButton.attr('disabled', true);
          roll = currentPlayer.rollDie();
          movePlayer(currentPlayer, roll);
          $('.roll-value').text(roll);
          updatePlayerInfoSection();
        });
      }
    }
  // END BUILD DYNAMIC ELEMENTS ------------------

  /* UPDATE BOARD STATE (CELLS & CENTER) ------------------
     Update board center content for every turn.
     Update cell when player is on a cell or purchases a cell.
  */
    function updateBoard() {
      updateTurnSection();
      updatePlayerInfoSection(player1);
      updatePlayerInfoSection(player2);
    }

    function updateTurnSection() {
      currentPlayer = player1.currentTurn === true ? player1 : player2;
      var currentCell = board[currentPlayer.location];
      $('h1.turn-title, .cell-info h2').css('color', currentPlayer.color);
      $('.turn-info .player-turn-name').text(currentPlayer.name);
      $('.cell-details .name').text(currentCell.name);
      $('.cell-details .value').removeClass('hide').removeClass('show');//clear show/hide classes

      if(currentCell.canPurchase) {
        $('.cell-details .value').text('Value: $' + currentCell.value);
        $('.cell-details .value').addClass('show');
      } else {
        //hide value section if not a property space
        $('.cell-details .value').addClass('hide');
      }
      $('.cell-info img').attr('src', 'images/' + currentCell.image);
    }

    function updatePlayerInfoSection() {
      //update property if they purchase
      //update money if they purchase
      players.forEach(function(player, i) {
        var $propertyListItem, $bullet, $image, $name, $value;
        var currentPlayerInfoClass = '.player-' + player.num + '-info';
        var $propertyList = $(currentPlayerInfoClass + ' ul');
        $(currentPlayerInfoClass + ' .money').text('$' + player.money);

        // $propertyList.removeClass('hide').removeClass('show');//reset hide/show classes if they have been added
        if(currentPlayer.properties.length > 1) { //loop through properties (if any) and build list
          // $propertyList.empty().addClass('show');//clear property list & show it
          $propertyList.empty(); //empty property list each time
          currentPlayer.properties.forEach(function(property) {
            $propertyItem = $('<li>');
            $bullet = $('<span />', { 'class': 'bullet', text: '▶' });
              $bullet.css('color', property.color);
            $image = $('<img />', { src: 'images/' + property.image, alt: property.name });
            $name = $('<span />', { 'class': 'name', text: property.name });
            $value = $('<span />', { 'class': 'value', text: '$' + property.value });
            $propertyItem.append($bullet).append($image).append($name).append($value);
            $propertyList.append($propertyItem);
          });

          $(currentPlayerInfoClass + ' .properties').append($propertyList);
        } else { //hide property ul if player has no property
          // $(currentPlayerInfoClass + ' ul').addClass('hide');
        }
      });
    }

    function addPropertyOwner(cell, index) {
      //color will be player.color
      console.log('got into property owner function');
      var $owner = $('<span />', { 'class': 'owner', css: { 'background-color': currentPlayer.color } });
      $(cell).append($owner);
      currentPlayer.addProperty(board[index]); //update player's property array
      board[index].owner = currentPlayer.name; //update owner property of cell
    }

    function removePropertyOwner(cell) { //if user sells property
      // cell.remove();
    }

    function movePlayer(player, numSpaces) {
      //get current location of player (board array index)
      var className = 'player-' + player.num;
      //remove class on old space (make background default color)
      boardElements[player.location].classList.remove(className);

      //update player's location & change background of new location
      player.location += numSpaces;
      if(player.location > 27) {
        var extra = player.location - 27;
        player.location = extra - 1; //subtract one since array is base 0
      }
      boardElements[player.location].classList.add(className);

      //check if cell is vacant/owned by other player/go cell/go to jail cell
      checkCellVacancy(player.location);

      switchTurns(); //switch turns after current player is done (i.e. after purchasing property)
    }

    function checkCellVacancy(cellIndex) {
      var $currentCell = board[cellIndex];
      var $currentCellElement = boardElements[cellIndex];
      //don't need to check for cell vacancy on go/jail/free parking/go to jail
      if($currentCell.canPurchase) {
        if($currentCell.owner === '') {
          //add property if user has enough money & user clicks 'yes' button
          if(currentPlayer.money - $currentCell.value >= 0) {
            currentPlayer.money -= $currentCell.value; //deduct value of property from user's money
            addPropertyOwner($currentCellElement, cellIndex);
          }

          //if no, just exit function
        } else {
          //if owner is not '', check if current player is owner, or other player
          var currentOwner = ($currentCell.owner === currentPlayer.name) ? true : false;
          if(!currentOwner) {
            //deduct property value worth from current player's money, and add to other player's money
            console.log('you are not current owner');
          }
        }
      }

    }

    function printCellState(cell) {
      //print current state of cell (i.e. owners, which players on space, name, value...)
    }
  // END UPDATE BOARD STATE ------------------

    function _init() {
      populateCells();
      displayStartModal();
    }

  return {
    init: _init
  }
})();

$(document).ready(function() {
  Main.init();
});

/* GLOBAL VARIABLES ------------------

*/
  var $board = $('#board');
  var $boardLeft = $('.column-1 > div');
  var $boardTop = $('.column-2 > div.top-row');
  var $boardRight = $('.column-3 > div');
  var $boardBottom = $('.column-2 > div.bottom-row');
  var $rollButton;
  var board = [];
  var boardElements = [];
  var players;
  var player1;
  var player2;
  var currentPlayer;
  var turnCount;
  var roll = '';

