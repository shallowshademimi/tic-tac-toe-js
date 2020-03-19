// shared variables
var size = 3;
var position, currentPlayer, winner;

// functions
// update html game board to the current state of position
function update_game() {
  for(var i = 0; i < position.length; i++){
      for(var j = 0; j < position[i].length; j++){
          var id = "cell_" + i + '_' + j;
          document.getElementById(id).innerHTML = position[i][j];
      }
  }
}

// update html message based on the current game state
function update_message() {
  if (winner) {
    message = winner + " wins!";
  } else if ($(".visited").length == size * size) {
    message = "Draw game."
  } else {
    message = currentPlayer + "'s move"
  }
  $("#message").html(message);
}

// reset game state and all related variables and visuals
// to the initial state
function reset_game() {
  position = [["?","?","?"],["?","?","?"],["?","?","?"]];
  update_game(position);
  $(".cell").removeClass("visited");
  currentPlayer = 'X';
  winner = null;
  update_message();
}

// check if winner exists for current game state
// and set winner accordingly
function check_winner(row, col) {
  // check row
  for (var i = 0; i < size; i++) {
    if (position[row][i] !== currentPlayer) {
      break;
    }
    if (i == size - 1) {
      winner = currentPlayer;
      return;
    }
  }

  // check column
  for (var i = 0; i < size; i++) {
    if (position[i][col] != currentPlayer) {
      break;
    }
    if (i == size - 1) {
      winner = currentPlayer;
      return
    }
  }

  // check diagnal
  if (row == col) {
    for (var i = 0; i < size; i++) {
      if (position[i][i] != currentPlayer) {
        break;
      }
      if (i == size - 1) {
        winner = currentPlayer;
        return;
      }
    }
  }
  
  // check anti-diaganal
  if (row + col == size - 1) {
    for (var i = 0; i < size; i++) {
      if (position[i][size - 1 - i] != currentPlayer) {
        break;
      }
      if (i == size - 1) {
        winner = currentPlayer;
        return;
      }
    }
  }
}

// initialize game to original state
reset_game();

// event listeners
$(".cell").click(function() {
  // check if cell is already visited, and if yes, return / finish immediately
  if ($(this).hasClass("visited") || winner != null) { return; }
  // $(this) represents the current clicked element
  var id = $(this).attr("id");
  var row = id.split("_")[1];
  var col = id.split("_")[2];
  // update game state with my location
  position[row][col] = currentPlayer;
  // redraw game board
  update_game(position);
  
  // it's time to check for winner
  check_winner(row, col);
  
  // swap player
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
  // mark current cell as visited
  $(this).addClass("visited");

  update_message();
});

$("#reset").click(function() {
  reset_game();
});