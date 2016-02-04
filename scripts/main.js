var Main = (function() {

  /* START MODAL ------------------

  */
      function displayStartModal() { //starts game
        var $startModal, $content, $logo, $players, $player1, $player2, $player1Title, $player2Title, $nameText, $characterText, $nameTextBox, $startButton;

        $('body').append(buildStartModal());
        activateStartButtonEvents(); //activate start button after modal is added to dom

        function buildStartModal() {
          $startModal = $('<div />', { 'class': 'modal'} );
          $content = $('<div />', { 'class': 'modal-content' });
          $players = $('<div />', { 'class': 'players' });
          $logo = $('<img />', { 'class': 'logo', src: 'images/pokemonopoly.png', alt: 'Pokémonopoly' });
          $nameText = $('<span />', { 'class': 'name', text: 'Name: '});
          $nameTextBox = $('<input />', { type: 'text' });
          $player1 = $('<div />', { 'class': 'player-1' });
            $player1Title = $('<h3 />', { text: 'Player 1' });
            $player1.append($player1Title).append($nameText.clone()).append($nameTextBox.clone().addClass('player-1-name'));
          $player2 = $('<div />', { 'class': 'player-2' });
            $player2Title = $('<h3 />', { text: 'Player 2' });
            $player2.append($player2Title).append($nameText.clone()).append($nameTextBox.clone().addClass('player-2-name'));
          $players.append($player1).append(' ').append($player2);
          $startButton = $('<button />', { 'class': 'start-button disabled', text: 'START GAME' });
          $content.append($logo).append($players).append($startButton);
          $startModal.append($content);

          return $startModal;
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
          $startButton.on('click', startButtonHandler);
        }

        function removeStartButtonClick() {
          $startButton.unbind('click');
        }
      }

     function startButtonHandler() {
      player1 = new Player(1, $('.player-1-name').val());
      player2 = new Player(2, $('.player-2-name').val());
      players = [player1, player2];
      currentPlayer = player1;
      $('.modal').remove();
      jackpotAmount = 0;
      turn = 0;
      movePlayer(player1, 0); //start player 1 on 'Go' space
      movePlayer(player2, 0); //start player 2 on 'Go' space
      buildPlayerInfoSections();
      buildTurnSection();
    }
  // END START MODAL ------------------

  /* GAME PLAY ------------------

  */
    function switchTurns() {
      currentPlayer.currentTurn = false;
      currentPlayer = (currentPlayer === player1) ? player2 : player1;
      currentPlayer.currentTurn = true;
      updateTurnSection();
      render();

      if(currentPlayer.inJail) $('.jail-roll-button').removeClass('hide');
    }

    function render() {
      updateCurrentCellSection();
      updatePlayerInfoSection();
    }

    function resetRoll() {
      $('.roll-image').attr('src', 'images/die-roll.gif');
      $rollButton.removeClass('disabled');
      $rollButton.attr('disabled', false);
    }

    function startGame() {
      populateCells();
      displayStartModal();
    }

  // END GAME PLAY ------------------

  /* DATA RETRIEVAL ------------------
     Read cells.js file to get data to populate cells.
  */
    function populateCells() {
    var $cell, $cellElement;
    $cells.each(function(index) {
      cellElement = $('.column-' + this.column + '> div')[this.index];

      switch(this.type.toLowerCase()) { /* create cells based on type */
        case 'go':
        case 'jail':
        case 'gotojail':
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
          $jailInfo = $('<p />', { 'class': 'jail-info hide', text: 'In Jail' })
            .append($('<span />', { 'class': 'jail-turn hide', text: ' | Turn: ' }).append($('<span />', { 'class': 'jail-turn-count', text: '0' })));
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

      buildResetButton();
    }

    function buildResetButton() {
      var $reset = $('<div />', { 'class': 'reset' });
      $resetButton = $('<a />', { 'class': 'reset-button', text: 'START A NEW GAME' });
      $reset.append($resetButton);

      $('.board-center').prepend($playerInfoSection).append($reset);

      $('.reset-button').on('click', function() {
        $('div').attr('class', '').empty();
        $('.board-center').empty();
        board.forEach(function(cell) {
          cell.owner = ''; //clear cell owners
        });
        startGame();
      });
    }

    function buildTurnSection() {
      var $turnInfo = $('<div />', { 'class': 'turn-info' });
      var $title = $('<h1 />', { 'class': 'turn-title', text: 'Turn: ' }).append($('<span />', { 'class': 'player-turn-name', text: currentPlayer.name }));
        $title.css('color', currentPlayer.color);
      var $jackpotTitle = $('<h3 />', { 'class': 'jackpot-title', text: 'Jackpot: $' }).append($('<span />', { 'class': 'jackpot-value', text: '0' }));

      var $roll = $('<div />', { 'class': 'roll' });
        var $rollTitle = $('<h2 />', { text: 'Roll' });
        var $rollValue = $('<span />', { 'class': 'roll-value', text: ' ' });
        var $rollImage = $('<img />', { 'class': 'roll-image', src: 'images/die-roll.gif' } );
        $rollButton = $('<button />', { 'class': 'roll-button', text: 'ROLL' });
        $jailRollButton = $('<button />', { 'class': 'jail-roll-button hide', text: 'JAIL ROLL' });
        $roll.append($rollTitle).append($rollValue).append($rollImage).append($rollButton).append($jailRollButton);

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
      jailRollEvent();

      $rollButton = $('.roll-button');//set global rollButton value to newly added dom element

      $rollButton.on('click', function() {
        roll += 1;
        $rollButton.addClass('disabled');
        $rollButton.attr('disabled', true);
        roll = currentPlayer.rollDie();
        $('.roll-image').attr('src', 'images/' + roll + '.png');
        movePlayer(currentPlayer, roll);
      });
    }

    buildWinnerModal = function(winnerList) { //global for testing
      var $winnerModal = $('<div />', { 'class': 'modal' });
      var $winnerContent = $('<div />', { 'class': 'modal-content winner' });
      var winnerText;

      if(winnerList.length > 1) { //if list is greater than 1, then all players lost
        winnerText = 'All Players Lost.'
        winnerImage = 'haunter_large.png';
      } else {
        winnerText = winnerList[0].name.toUpperCase() + ' WON!';
        winnerImage = 'pikachu_large.png';
      }

      var $winnerImage = $('<img />', { src: 'images/' + winnerImage });

      var $winnerTitle = $('<h1 />', { 'class': 'winner-name', text: winnerText, css: { 'color': winnerList[0].color } });
      var $winner = $('<p />', { 'class': 'winner-text' });
      $winner.append($winnerTitle).append($resetButton);
      $winnerContent.append($winnerImage).append($winner);
      $winnerModal.append($winnerContent);
      $('body').append($winnerModal);
    }

  // END BUILD DYNAMIC ELEMENTS ------------------

  /* UPDATE BOARD STATE (CELLS & CENTER) ------------------

  */
    function updateTurnSection() {
      currentPlayer = player1.currentTurn === true ? player1 : player2;
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
        $('.cell-details .value').addClass('hide'); //hide value section if not a property space
      }
      $('.cell-info img').attr('src', 'images/' + currentCell.image);
    }

    function updatePlayerInfoSection() {
      players.forEach(function(player) { //update property & money for each player
        var $propertyListItem, $bullet, $image, $name, $value, $jailInfo;
        var currentPlayerInfoClass = '.player-' + player.num + '-info';
        var $propertyList = $(currentPlayerInfoClass + ' ul');
        $(currentPlayerInfoClass + ' .money').text('Money: $' + player.money);

        if(player.properties.length > 0) { //loop through properties (if any) and build list
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

        //hide/show jail info if player is/is not in jail
        $(currentPlayerInfoClass + ' .jail-info').toggleClass( 'hide', !player.inJail );
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
        rollToGetOutOfJail();
      }
    }

    function activateJailCell() {
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
        $rollButton.removeClass('disabled');
        $rollButton.attr('disabled', false);
        $notification.remove();
        $('.jail-turn').removeClass('hide');//unhide span tag containing jail roll count
        switchTurns();
        resetRoll();
      });
    }

    function payJailFee() {
      currentPlayer.money -= 50;
      currentPlayer.inJail = false;
      checkForWinner();
    }

    function rollToGetOutOfJail() {
      $jailRollButton.removeClass('hide'); //unhide jail roll button
    }

    function jailRollEvent() {
      var infoText, roll;
      var jailRollCountClass = '.player-' + currentPlayer.num + '-info .jail-turn-count';
      var jailRollTurnClass = '.player-' + currentPlayer.num + '-info .jail-turn';
      var jailInfoClass = '.player-' + currentPlayer.num + '-info .jail-info';

      $jailOk = $('<a />', { 'class': 'green', text: 'OK' });

      var $jailNotification = $('<div />', { 'class': 'notification' });
      $title = $('<h2 />', { 'class': 'notification-title', text: 'Note:' });

      $jailRollButton.on('click', function() { //make this global
        currentPlayer.jailRollCount += 1;

        $(jailRollCountClass).text(currentPlayer.jailRollCount);//update display of jail roll count
        roll = (currentPlayer.rollDie());
        infoText = 'You rolled a ' + roll + '. Turn: ' + currentPlayer.jailRollCount + '.';
        $('.roll-image').attr('src', 'images/' + roll + '.png');

        rollEven = (roll % 2 === 0) ? true : false;

        if(rollEven) { //get out of jail if even roll
          infoText = 'You have rolled an even number. You are now out of jail.';
          resetJailRollInfo();
        }

        if(!rollEven && currentPlayer.jailRollCount === 3) {
          infoText = 'You didn\'t get an even number in 3 tries. You are now out of jail, but you had to pay $50.';
          payJailFee();
          resetJailRollInfo();
        }

        $info = $('<p />', { 'class': 'notification-text', text: infoText }).append('<br />').append($jailOk);
        $jailNotification.append($title).append($info);
        $('.cell-info').append($jailNotification);

        $jailOk.on('click', function() {
          $jailNotification.empty();
          $jailNotification.remove();
          $jailRollButton.addClass('hide');
          switchTurns();
          resetRoll();
        });

        function resetJailRollInfo() {
          currentPlayer.jailRollCount = 0;
          $(jailRollCountClass).text('0'); //count text
          $(jailRollTurnClass).addClass('hide'); //"turn" text
          $(jailInfoClass).addClass('hide')//"in jail" text
          currentPlayer.inJail = false;
        }

      });
    }

    function checkCellVacancy(cellIndex) {
      var $title, $info, $yesButton, $noButton, $okButton, infoText;
      var currentCell = board[cellIndex];
      var $currentCellElement = boardElements[cellIndex];
      $notification = $('<div />', { 'class': 'notification' });
      $okButton = $('<a />', { 'class': 'green', text: 'OK' });

      $okButton.on('click', function() {
          $notification.remove();
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
          var propertyOwner = currentPlayer === player1 ? player2 : player1;
          var propertyValue = board[currentPlayer.location].value;
          currentPlayer.money -= propertyValue;
          propertyOwner.money += propertyValue;
          checkForWinner();
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
          jackpotAmount += 200;
          updateJackpotValue(); //update jackpot text on screen
          currentPlayer.money -= 200;
          checkForWinner();
        }

        function goSpace() {
          currentPlayer.money += 200;
        }

        function jackpot() {
          currentPlayer.money += jackpotAmount;
          jackpotAmount = 0;//reset jackpot
          updateJackpotValue(); //update jackpot text on screen
        }

        goToJail = function() { //global function
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

    function checkForWinner() {
      var winnerList = [];
      var winner = false;
      var player1Money = player1.money;
      var player2Money = player2.money;

      if(player1Money <= 0 && player2Money <= 0) {//check for tie {
        winnerList.push(player1);
        winnerList.push(player2);
        winner = true;
      } else if(player1Money <= 0) {
        winnerList.push(player2);
        winner = true;
      } else if(player2Money <= 0) {
        winnerList.push(player1);
        winner = true;
      }


      if(winner) buildWinnerModal(winnerList);
    }

  // END UPDATE BOARD STATE ------------------

  function _init() {
    startGame();
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
  var $resetButton
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
  var buildWinnerModal;
