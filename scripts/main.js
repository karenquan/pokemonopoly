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
      $('.board-center').append($('<img />', { src: 'images/pokemonopoly.png', 'class': 'logo', alt: 'Pokémonopoly' }));
    }

    function switchTurns() {
      currentPlayer.currentTurn = false;
      currentPlayer = (currentPlayer === player1) ? player2 : player1;
      currentPlayer.currentTurn = true;
      updateTurnSection();

      render();//test

      //need to make jail roll button click event global
      if(currentPlayer.inJail) {
        $('.jail-roll-button').removeClass('hide');
      }
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
    function displayStartModal() { //starts game
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
      cellElement = $('.column-' + this.column + '> div')[this.index];

      switch(this.type.toLowerCase()) { /* create cells based on type */
        case 'go':
        case 'jail':
        case 'gotojail':
        // case 'parking':
          buildCornerCell(this, cellElement);
          cellElement.classList.add(this.type.toLowerCase() + '-cell');
          break;
        case 'parking':
          buildCornerCell(this, cellElement);
          cellElement.classList.add(this.type.toLowerCase() + '-cell');
          break;
        default:
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
      $title = $('<span />', { 'class': 'title', text: cell.text, css: { color: cell.color } });
      $image = $('<img />', { src: 'images/' + cell.image });
      $content.append($title).append($image);
      $cell.append($content);
    }

    function buildPlayerInfoSections() {
      var $playerInfo, $player1Info, $player2Info, $name, $properties, $money, $jailInfo;
      $playerInfoSection = $('<div />', { 'class': 'player-info' });

      players.forEach(function(player) {
          var $playerInfo = $('<div />', { 'class': 'player-' + player.num + '-info' });
          $name = $('<h1 />', { text: 'Player ' + player.num + ': ' }).append($('<span />', { 'class': 'name', text: player.name }));
          $jailInfo = $('<p />', { 'class': 'jail-info', text: 'In Jail | Turn Count: ' }).append($('<span />', { 'class': 'jail-turn-count', text: '0' }));
          $properties = $('<div />', { 'class': 'properties' }).append($('<h2 />', { text: 'Properties' })).append($('<ul />', { 'class': 'properties-list' }));
          $money = $('<h2 />', { 'class': 'money', text: 'Money: $' + player.money });
          $playerInfo.append($name).append($jailInfo).append($money).append($properties);
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
      var $jackpotTitle = $('<h3 />', { 'class': 'jackpot-title', text: 'Jackpot: $' }).append($('<span />', { 'class': 'jackpot-value', text: '0' }));

      var $roll = $('<div />', { 'class': 'roll' });
        var $rollTitle = $('<h2 />', { text: 'Roll' });
        var $rollValue = $('<span />', { 'class': 'roll-value', text: ' ' });
        // var $rollImage = $('<img />', { src: 'images/dice.gif' } );
        $rollButton = $('<button />', { 'class': 'roll-button', text: 'ROLL' });
        $jailRollButton = $('<button />', { 'class': 'jail-roll-button hide', text: 'JAIL ROLL' });
        // $roll.append($rollTitle).append($rollValue).append($rollImage).append($rollButton);
        $roll.append($rollTitle).append($rollValue).append($rollButton).append($jailRollButton);

      var $cellInfo = $('<div />', { 'class': 'cell-info' });
        var $cellTitle = $('<h2 />', { text: 'Current Space' });
        $cellTitle.css('color', currentPlayer.color);
        var $cellDetails = $('<div />', { 'class': 'cell-details' });
        var $cellName = $('<h3 />', { text: 'Name: ' }).append($('<span />', { 'class': 'name', text: 'Go' }));
        var $cellValue = $('<h3 />', { 'class': 'value' });
        var $cellImage = $('<img />', { src: 'images/go.png' });
        $cellDetails.append($cellName).append($cellValue);

        $cellInfo.append($cellTitle).append($cellDetails).append(' ').append($cellImage);//.append($notification);

      $turnInfo.append($title).append($jackpotTitle).append($roll).append(' ').append($cellInfo);
      $('.board-center').prepend($turnInfo);
      $jackpot = $('.jackpot-value'); //set global jackpot to newly added dom element
      $jailRollButton = $('.jail-roll-button'); //set global jail roll button to newly added dom element
        attachJailRollClickEvent();

      $rollButton = $('.roll-button');//set global rollButton value to newly added dom element

      $rollButton.on('click', function() {
        console.log('regular roll click');
        roll += 1;
        $rollButton.addClass('disabled');
        $rollButton.attr('disabled', true);
        roll = currentPlayer.rollDie();
        $('.roll-value').text(roll).css('color', '#009933');
        movePlayer(currentPlayer, roll);
      });
    }

  // END BUILD DYNAMIC ELEMENTS ------------------

  /* UPDATE BOARD STATE (CELLS & CENTER) ------------------
     Update board center content for every turn.
     Update cell when player is on a cell or purchases a cell.
  */

    function updateTurnSection() {
      currentPlayer = player1.currentTurn === true ? player1 : player2;
      // var currentCell = board[currentPlayer.location];
      $('h1.turn-title, .cell-info h2').css('color', currentPlayer.color);
      $('.turn-info .player-turn-name').text(currentPlayer.name);
    }

    function updateJackpotValue() {
      $jackpot.text(jackpotAmount);
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
        var $propertyListItem, $bullet, $image, $name, $value, $jailInfo;
        var currentPlayerInfoClass = '.player-' + player.num + '-info';
        var $propertyList = $(currentPlayerInfoClass + ' ul');
        $(currentPlayerInfoClass + ' .money').text('Money: $' + player.money);

        //loop through properties (if any) and build list
        if(player.properties.length > 0) {
          $propertyList.empty(); //empty property list each time
          player.properties.forEach(function(property) {
            $propertyItem = $('<li />').css('color', property.color);
            $bullet = $('<span />', { 'class': 'bullet', html: '&#9700' });
            $image = $('<img />', { src: 'images/' + property.image, alt: property.name });
            $name = $('<span />', { 'class': 'name', text: property.name });
            $value = $('<span />', { 'class': 'value', text: '$' + property.value });
            $propertyItem.append($bullet).append($image).append($name).append(' | ').append($value);
            $propertyList.append($propertyItem);
          });
          $(currentPlayerInfoClass + ' .properties').append($propertyList);
        }

        //update jail info section

      });
    }

    function addPropertyOwner(cell, index) {
      var $owner = $('<span />', { 'class': 'owner', css: { 'background-color': currentPlayer.color } });
      $(cell).append($owner);
      currentPlayer.addProperty(board[index]); //update player's property array
      board[index].owner = currentPlayer.name; //update owner property of cell
      currentPlayer.money -= board[index].value; //deduct value of cell from player's money
      updatePlayerInfoSection();
    }

    movePlayer = function(player, numSpaces) { //global function for testing
      var className = 'player-' + player.num;

      if(!player.inJail) { //only move player if they're not in jail
        boardElements[player.location].classList.remove(className); //remove class on old space (make background default color)

        //update player's location & change background of new location
        player.location += numSpaces;
        if(player.location > 27) {
          var extra = player.location - 27;
          player.location = extra - 1; //subtract one since array is base 0
        }
        boardElements[player.location].classList.add(className);
        render();

        checkCellVacancy(player.location); //check if cell is vacant/owned by other player/go cell/go to jail cell
      } else {
        console.log('you are in jail');
        rollToGetOutOfJail();
      }
    }

    function activateJailCell() {
      console.log('got into activate jail cell');
      var $title, $info, $payButton, $rollOptionButton, infoText;
      $notification = $('<div />', { 'class': 'notification' });
      $title = $('<h2 />', { 'class': 'notification-title', text: 'Note:' });
      infoText = 'You are in jail. You can either pay $50 to get out now, or roll an even number within 3 turns (starting with your next turn).';
      $payButton = $('<a />', { 'class': 'jail-pay green', text: 'PAY' });
      $rollOptionButton = $('<a />', { 'class': 'jail-roll red', text: 'ROLL' });
      $info = $('<p />', { 'class': 'notification-text', text: infoText }).append('<br />').append($payButton).append($rollOptionButton);

      $notification.append($title).append($info);
      $('.cell-info').append($notification);

      $payButton.on('click', function() {
        $notification.remove();
        payJailFee();
        switchTurns();
        resetRoll();
      });

      $rollOptionButton.on('click', function() {
        console.log('roll option button click');
        $rollButton.removeClass('disabled');
        $rollButton.attr('disabled', false);
        $notification.remove();
        switchTurns();
        resetRoll();
      });
    }

    function payJailFee() {
      console.log('got into pay jail fee function.');
      console.log(currentPlayer.name + ' OLD $: ' + currentPlayer.money);
      currentPlayer.money -= 50;
      currentPlayer.inJail = false;
      console.log(currentPlayer.name + ' NEW $: ' + currentPlayer.money);
      console.log('');
    }

    function rollToGetOutOfJail() {
      //need to have another roll button to have a separate click event from original roll button
      $jailRollButton.removeClass('hide'); //unhide jail roll button
    }

    function attachJailRollClickEvent() {
      var infoText, roll;
      $jailOk = $('<a />', { 'class': 'green', text: 'OK' });

      var $jailNotification = $('<div />', { 'class': 'notification' });
      $title = $('<h2 />', { 'class': 'notification-title', text: 'Note:' });

      $jailRollButton.on('click', function() { //make this global
        currentPlayer.jailRollCount += 1;
        roll = (currentPlayer.rollDie());
        infoText = 'You rolled a ' + roll + '. Turn: ' + currentPlayer.jailRollCount + '.';
        $('.roll-value').text(roll).css('color', '#CC0000'); //display roll number

        rollEven = (roll % 2 === 0) ? true : false;
        console.log('player rolled ' + roll);

        if(rollEven) { //get out of jail if even roll
          infoText = 'You have rolled an even number. You are now out of jail.';
          currentPlayer.jailRollCount = 0;
          currentPlayer.inJail = false;
          console.log('you are now out of jail');
        }

        if(!rollEven && currentPlayer.jailRollCount === 3) {
          infoText = 'You didn\'t get an even number in 3 tries. You are now out of jail, but you had to pay $50.';
          payJailFee();
          currentPlayer.jailRollCount = 0;
          currentPlayer.inJail = false;
        }

        $info = $('<p />', { 'class': 'notification-text', text: infoText }).append('<br />').append($jailOk);
        $jailNotification.append($title).append($info);
        $('.cell-info').append($jailNotification);

        console.log(currentPlayer.name + ' jailrollcount: ' + currentPlayer.jailRollCount);
        console.log(currentPlayer.name + ' in jail: ' + currentPlayer.inJail);
        console.log('');

        $jailOk.on('click', function() {
          console.log('jail OK click');
          $jailNotification.empty();
          $jailNotification.remove(); //remove notification box
          $jailRollButton.addClass('hide');
          switchTurns();
          resetRoll();
        });
      });
    }

    function checkCellVacancy(cellIndex) {
      var $title, $info, $yesButton, $noButton, $okButton, infoText;
      var currentCell = board[cellIndex];
      var $currentCellElement = boardElements[cellIndex];
      $notification = $('<div />', { 'class': 'notification' });
      $okButton = $('<a />', { 'class': 'green', text: 'OK' });

      $okButton.on('click', function() {
          $notification.remove();//remove notification box
          switchTurns();
          resetRoll();
        });

      //check for cell vacancy on property cells
      if(currentCell.canPurchase) displayPropertyUserNotification();
      else displayNonPropertyNotification();

      function displayPropertyUserNotification() {
        var propertyNotification;

        if(currentCell.owner === '') { //check if cell is vacant
          if(currentPlayer.money - currentCell.value >= 0) {
            displayAddPropertyNotification();
            return;
          } else {
            infoText = "You don't have enough money to purchase this property.";
          }
        } else if (currentCell.owner === currentPlayer.name) { //check if current player is owner
          infoText = "You already own this space.";
        } else { //else other player owns space - pay other player
          infoText = currentCell.owner + ' owns this space. You owe $' + currentCell.value + '.';
          payPlayer();
        }

        $title = $('<h2 />', { 'class': 'notification-title', text: 'Note:' });
        $info = $('<p />', { 'class': 'notification-text', text: infoText }).append('<br />').append($okButton);
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
          $yesButton = $('<a />', { 'class': 'green', text: 'YES' });
          $noButton = $('<a />', { 'class': 'red', text: 'NO' });
          $title = $('<h2 />', { 'class': 'notification-title', text: 'Note:' });
          $info = $('<p />', { 'class': 'notification-text', text: infoText }).append('<br />').append($yesButton).append($noButton);
          $notification.append($title).append($info);
          $('.cell-info').append($notification);

          $yesButton.on('click', function() {
            $notification.remove();
            addPropertyOwner($currentCellElement, cellIndex);
            switchTurns();
            resetRoll();
          });

          $($noButton).on('click', function() {
            $notification.remove();//remove notification box
            switchTurns();
            resetRoll();
          });
      }

      function displayNonPropertyNotification() {
        var currentCell = board[currentPlayer.location];
        var type, info, $jailOkButton;
        $jailOkButton = $('<a />', { 'class': 'green', text: 'OK' });
        $jailOkButton.on('click', function() {
          $notification.remove();//remove notification box
          activateJailCell();
        });

        switch(currentCell.type.toLowerCase()) {
            case 'go':
              info = 'You landed on Go! Collect $200.'
              if(roll > 2) goSpace();
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

        if(currentCell.type.toLowerCase() === 'gotojail') {
          $info = $('<p />', { 'class': 'notification-text', text: info }).append('<br />').append($jailOkButton);
        } else {
          $info = $('<p />', { 'class': 'notification-text', text: info }).append('<br />').append($okButton);
        }

        $title = $('<h2 />', { 'class': 'notification-title', text: 'Note:' });
        $notification.append($title).append($info);
        $('.cell-info').append($notification);

        //ACTIONS
        function attack() {
          //add $200 to jackpot, deduct $200 from currentplayer
          console.log('ATTACK FUNCTION');
          console.log(currentPlayer.name + ' OLD: $' + currentPlayer.money);
          jackpotAmount += 200;
          updateJackpotValue(); //update jackpot text on screen
          currentPlayer.money -= 200;
          console.log(currentPlayer.name + ' NEW: $' + currentPlayer.money);
          console.log('CURRENT JACKPOT: $' + jackpotAmount);
          console.log('');
        }

        function goSpace() {
          console.log('GO FUNCTION');
          console.log(currentPlayer.name + ' OLD: $' + currentPlayer.money);
          currentPlayer.money += 200;
          console.log(currentPlayer.name + ' NEW: $' + currentPlayer.money);
          console.log(' ');
        }

        function jackpot() {
          console.log('JACKPOT FUNCTION');
          console.log(currentPlayer.name + ' OLD: $' + currentPlayer.money);
          currentPlayer.money += jackpotAmount;
          console.log(currentPlayer.name + ' NEW: $: ' + currentPlayer.money);
          console.log(' ');
          jackpotAmount = 0;//reset jackpot
          updateJackpotValue(); //update jackpot text on screen
        }

        goToJail = function() { //global function
          console.log('GO TO JAIL FUNCTION');
          var className = 'player-' + currentPlayer.num;
          //remove class on current player's old space (make background default color)
          boardElements[currentPlayer.location].classList.remove(className);

          //update player's location to jail cell & change background of jail cell
          currentPlayer.location = 7; //jail cell is index 7
          currentPlayer.inJail = true;
          boardElements[currentPlayer.location].classList.add(className);
          render();
          $rollButton.addClass('disabled');
          $rollButton.attr('disabled', true);
        }

      } /* end displayNonPropertyNotification() function  */
    } /* end checkCellVacancy() function */

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
  var $rollButton;
  var $jailRollButton;
  var $notification;
  var $jailInfo;
  var $jackpot;
  var board = [];
  var boardElements = [];
  var players;
  var player1;
  var player2;
  var currentPlayer;
  var roll = 0;
  var jackpotAmount;
  var movePlayer;
