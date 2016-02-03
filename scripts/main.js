var Main = (function() {

  /* GAME PLAY ------------------

  */
    function startGame() {
      //grab player names before removing modal
      player1 = new Player(1, $('.player-1-name').val());
      player2 = new Player(2, $('.player-2-name').val());
      players = [player1, player2];
      currentPlayer = player1;
      $('.start-modal').remove();
      jackpotAmount = 0;
      turn = 0;
      movePlayer(player1, 0); //start player 1 on 'Go' space
      movePlayer(player2, 0); //start player 1 on 'Go' space
      buildPlayerInfoSections(); //build player info section before turn section for it to appear in the correct spot
      buildTurnSection();
    }

    function switchTurns() {
      currentPlayer.currentTurn = false;
      currentPlayer = (currentPlayer === player1) ? player2 : player1;
      currentPlayer.currentTurn = true;
      updateTurnSection();
    }

    function render() {
      updateCurrentCellSection();
      updatePlayerInfoSection();
    }

    function resetRoll() {
      $('.roll-value').text(' ');
      $rollButton.removeClass('disabled');
      $rollButton.attr('disabled', false);
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
    // console.log($cells);
    $cells.each(function(index) {
      cellElement = $('.column-' + this.column + ' div')[this.index];
      // console.log(cellElement);
      // if(this.name === 'Free Parking') {
      //     console.log('before');
      //     console.log(cellElement);
      // }
      switch(this.type.toLowerCase()) { /* create cells based on type */
        case 'go':
        case 'jail':
        case 'gotojail':
        // case 'parking':
          buildCornerCell(this, cellElement);
          cellElement.classList.add(this.type.toLowerCase() + '-cell');
          break;
        case 'parking':
          // buildCornerCell(this, cellElement);
          cellElement.classList.add(this.type.toLowerCase() + '-cell');
          break;
        default:
          if(this.name === 'Free Parking') {
            // console.log('after');
            // console.log(cellElement);
          }
          buildPropertyCell(this, cellElement);
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
    function buildPropertyCell(cell, element) {
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

    function buildCornerCell(cell, element) {
      var $cell, $name, $image;
      $cell = $(element);
      $content = $('<div />');
      $title = $('<span />', { 'class': 'title', text: cell.text });
      $image = $('<img />', { src: 'images/' + cell.image });
      $content.append($title).append($image);
      $cell.append($content);
    }

    function buildFreeParkingCell(cell, element) { //problems with using buildCornerCell...
      var $cell, $name, $image;
      $cell = $(element);
      $title = $('<span />', { 'class': 'title', text: cell.text });
      $image = $('<img />', { src: 'images/' + cell.image });
      $cell.append($title).append($image);
    }

    function buildPlayerInfoSections() {
      var $playerInfo, $player1Info, $player2Info, $name, $properties, $money;
      $playerInfoSection = $('<div />', { 'class': 'player-info' });

      players.forEach(function(player) {
          var $playerInfo = $('<div />', { 'class': 'player-' + player.num + '-info' });
          $name = $('<h1 />', { text: 'Player ' + player.num + ': ' }).append($('<span />', { 'class': 'name', text: player.name }));
          $properties = $('<div />', { 'class': 'properties' }).append($('<h2 />', { text: 'Properties' })).append($('<ul />', { 'class': 'properties-list' }));
          $money = $('<h2 />', { 'class': 'money', text: 'Money: $' + player.money });
          $playerInfo.append($name).append($money).append($properties);
          $playerInfo.css('border-color', player.color);
          if(player.num === 1) {
            $playerInfoSection.append($playerInfo).append(' '); //need to add space for justify effect
          } else {
            $playerInfoSection.append($playerInfo);
          }
      });

      $('.board-center').prepend($playerInfoSection);
    }

    function buildTurnSection() {
      var $turnInfo = $('<div />', { 'class': 'turn-info' });
      var $title = $('<h1 />', { 'class': 'turn-title', text: 'Turn: ' }).append($('<span />', { 'class': 'player-turn-name', text: currentPlayer.name }));
      $title.css('color', currentPlayer.color);

      var $roll = $('<div />', { 'class': 'roll' });
        var $rollTitle = $('<h2 />', { text: 'Roll' });
        var $rollValue = $('<span />', { 'class': 'roll-value', text: ' ' });
        // var $rollImage = $('<img />', { src: 'images/dice.gif' } );
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

        $cellInfo.append($cellTitle).append($cellDetails).append(' ').append($cellImage);//.append($notification);

      $turnInfo.append($title).append($roll).append(' ').append($cellInfo);
      $('.board-center').prepend($turnInfo);
      attachRollEvent();

      $rollButton = $('.roll-button');//update rollButton value to newly added dom element

      function attachRollEvent() {
        $rollButton.on('click', function() {
          roll += 1;
          $rollButton.addClass('disabled');
          $rollButton.attr('disabled', true);
          roll = currentPlayer.rollDie();
          movePlayer(currentPlayer, roll);
          $('.roll-value').text(roll);
        });
      }
    }
  // END BUILD DYNAMIC ELEMENTS ------------------

  /* UPDATE BOARD STATE (CELLS & CENTER) ------------------
     Update board center content for every turn.
     Update cell when player is on a cell or purchases a cell.
  */

    function updateTurnSection() {
      currentPlayer = player1.currentTurn === true ? player1 : player2;
      var currentCell = board[currentPlayer.location];
      $('h1.turn-title, .cell-info h2').css('color', currentPlayer.color);
      $('.turn-info .player-turn-name').text(currentPlayer.name);
    }

    function updateCurrentCellSection() {
      var currentCell = board[currentPlayer.location];
      $('.cell-info h2').css('color', currentPlayer.color);
      $('.cell-details').css('color', currentCell.color);
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
      //update property & money for each player
      players.forEach(function(player) {
        var $propertyListItem, $bullet, $image, $name, $value;
        var currentPlayerInfoClass = '.player-' + player.num + '-info';
        var $propertyList = $(currentPlayerInfoClass + ' ul');
        $(currentPlayerInfoClass + ' .money').text('Money: $' + player.money);

        //loop through properties (if any) and build list
        if(player.properties.length > 0) {
          $propertyList.empty(); //empty property list each time
          player.properties.forEach(function(property) {
            $propertyItem = $('<li />').css('color', property.color);
            $bullet = $('<span />', { 'class': 'bullet', text: '◤' });
            $image = $('<img />', { src: 'images/' + property.image, alt: property.name });
            $name = $('<span />', { 'class': 'name', text: property.name });
            $value = $('<span />', { 'class': 'value', text: '$' + property.value });
            $propertyItem.append($bullet).append($image).append($name).append(' | ').append($value);
            $propertyList.append($propertyItem);
          });

          $(currentPlayerInfoClass + ' .properties').append($propertyList);
        }
      });
    }

    function updatePlayersMoney() { //for when a player lands on other player's property
      players.forEach(function(player) {
          $('.player-' + player.num + '-info .money').text('Money: $' + player.money);
      });
    }

    function updateCurrentPlayerMoney() { //for when a player owes money / gets jackpot
      $('.player-' + currentPlayer.num + '-info .money').text('Money: $' + currentPlayer.money);
    }

    function addPropertyOwner(cell, index) {
      var $owner = $('<span />', { 'class': 'owner', css: { 'background-color': currentPlayer.color } });
      // console.log($owner);
      $(cell).append($owner);
      currentPlayer.addProperty(board[index]); //update player's property array
      board[index].owner = currentPlayer.name; //update owner property of cell
      //deduct value of cell from player's money
      currentPlayer.money -= board[index].value;
      updatePlayerInfoSection();
    }

    function removePropertyOwner(cell) { //if user sells property
      // cell.remove();
    }

    movePlayer = function(player, numSpaces) { //global function
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
      render();

      //check if cell is vacant/owned by other player/go cell/go to jail cell
      checkCellVacancy(player.location);
    }

    function checkCellVacancy(cellIndex) {
      var $title, $info, $yesButton, $noButton, $okButton,infoText;
      var currentCell = board[cellIndex];
      var $currentCellElement = boardElements[cellIndex];
      $notification = $('<div />', { 'class': 'notification' });
      $okButton = $('<a />', { 'class': 'property-ok', text: 'OK' });

      $okButton.on('click', function() {
          $notification.remove();//remove notification box
          switchTurns();
          render();
          resetRoll();
        });

      //don't need to check for cell vacancy on go/jail/free parking/go to jail
      if(currentCell.canPurchase) {
        displayPropertyUserNotification();
      }
      else {
        displayNonPropertyNotification();
        // switchTurns();
        // render();
      }

      function displayPropertyUserNotification() {
        if(currentCell.owner === '') { //check if cell is vacant
          if(currentPlayer.money - currentCell.value >= 0) {
            displayAddPropertyNotification();
          } else {
            infoText = "You don't have enough money to purchase this property.";
          $title = $('<h2 />', { 'class': 'notification-title', text: 'Note:' });
          $info = $('<p />', { 'class': 'notification-text', text: infoText }).append($okButton);
          }
        } else if (currentCell.owner === currentPlayer.name) { //check if current player is owner
          infoText = "You already own this space.";
          $title = $('<h2 />', { 'class': 'notification-title', text: 'Note:' });
          $info = $('<p />', { 'class': 'notification-text', text: infoText }).append($okButton);
        } else { //else other player owns space - pay other player
          infoText = currentCell.owner + ' owns this space. You owe $' + currentCell.value + '.';
          $title = $('<h2 />', { 'class': 'notification-title', text: 'Note:' });
          $info = $('<p />', { 'class': 'notification-text', text: infoText }).append($okButton);
          payPlayer();
        }

        $notification.append($title).append($info);
        $('.cell-info').append($notification);

        function payPlayer() {
          // var propertyOwner = board[currentPlayer.location].owner;
          var propertyOwner = currentPlayer === player1 ? player2 : player1;
          var propertyValue = board[currentPlayer.location].value;
          console.log('PAY PLAYER FUNCTION:');
          console.log(propertyOwner.name + ' OLD: $' + propertyOwner.money);
          console.log(currentPlayer.name + ' OLD: $' + currentPlayer.money);

          currentPlayer.money -= propertyValue;
          propertyOwner.money += propertyValue;

          console.log(propertyOwner.name + ' NEW: $' + propertyOwner.money);
          console.log(currentPlayer.name + ' NEW: $' + currentPlayer.money);
          console.log('');
        }
      }

      function displayAddPropertyNotification() {
          infoText = 'Would you like to purchase ' + currentCell.name + ' for $' + currentCell.value + '?';
          $yesButton = $('<a />', { 'class': 'property-yes', text: 'YES' });
          $noButton = $('<a />', { 'class': 'property-no', text: 'NO' });
          $title = $('<h2 />', { 'class': 'notification-title', text: 'Note:' });
          $info = $('<p />', { 'class': 'notification-text', text: infoText }).append($yesButton).append($noButton);
          $notification.append($title).append($info);
          $('.cell-info').append($notification);

          $yesButton.on('click', function() {
            $notification.remove();
            addPropertyOwner($currentCellElement, cellIndex);
            switchTurns();
            render();
            resetRoll();
          });

          $($noButton).on('click', function() {
            $notification.remove();//remove notification box
            switchTurns();
            render();
            resetRoll();
          });
      }

      function displayNonPropertyNotification() {
        var currentCell = board[currentPlayer.location];
        var type, info;
        switch(currentCell.type.toLowerCase()) {
            case 'go':
              info = 'You landed on Go! Collect $200.'
              if(roll > 1) goSpace();
              break;
            case 'jail':
              info = 'You are just visiting jail.';
              break;
            case 'parking':
              info = (jackpotAmount > 0) ? 'You win the jackpot of $' + jackpotAmount + '!' : 'There is no money in the jackpot.';
              if(jackpotAmount > 0) jackpot();
              break;
            case 'gotojail':
              info = 'You have trespassed on private property! You have to go to jail.';
              goToJail();
              break;
            case 'attack':
              info = 'You have been attacked! You owe $200.'
              attack();
              break;
            default:
              break;
        }
        $title = $('<h2 />', { 'class': 'notification-title', text: 'Note:' });
        $info = $('<p />', { 'class': 'notification-text', text: info }).append($okButton);
        $notification.append($title).append($info).append($yesButton).append($noButton);
        $('.cell-info').append($notification);

        //ACTIONS
        function attack() {
          //add $200 to jackpot, deduct $200 from currentplayer
          console.log('ATTACK FUNCTION');
          console.log(currentPlayer.name + ' OLD: $' + currentPlayer.money);
          jackpotAmount += 200;
          currentPlayer.money -= 200;
          console.log(currentPlayer.name + ' NEW: $' + currentPlayer.money);
          console.log('CURRENT JACKPOT: $' + jackpotAmount);
          console.log('');
          // updateCurrentPlayerMoney();
        }

        function goSpace() {
          console.log('GO FUNCTION');
          console.log(currentPlayer.name + ' OLD: $' + currentPlayer.money);
          currentPlayer.money += 200;
          console.log(currentPlayer.name + ' NEW: $' + currentPlayer.money);
          console.log(' ');
          // updateCurrentPlayerMoney();
        }

        function jackpot() {
          console.log('JACKPOT FUNCTION');
          console.log(currentPlayer.name + ' OLD: $' + currentPlayer.money);
          currentPlayer.money += jackpotAmount;
          console.log(currentPlayer.name + ' NEW: $: ' + currentPlayer.money);
          console.log(' ');
          jackpotAmount = 0;//reset jackpot
        }

        goToJail = function() { //global function
          console.log('GO TO JAIL FUNCTION');
          //get current location of player (board array index)
          var className = 'player-' + currentPlayer.num;
          //remove class on old space (make background default color)
          boardElements[currentPlayer.location].classList.remove(className);

          //update player's location & change background of new location
          currentPlayer.location = 7; //jail cell is index 7
          boardElements[currentPlayer.location].classList.add(className);
          render();
          $rollButton.addClass('disabled');
          $rollButton.attr('disabled', true);
        }

      } /* end displayNonPropertyNotification() function  */

    } /* end checkCellVacancy() function */

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
  var $notification;
  var board = [];
  var boardElements = [];
  var players;
  var player1;
  var player2;
  var currentPlayer;
  var currentCell;
  var turnCount;
  var roll = '';
  var jackpotAmount;
  var movePlayer;
  var goToJail;
  var turn;

