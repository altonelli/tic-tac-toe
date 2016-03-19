// wait for the DOM to finish loading

$(document).ready(function() {
  // all code to manipulate the DOM
  // goes inside this function
  var isWinner = false;
  var player = true;
  var player1Wins = 0;
  var player2Wins = 0;

  $('.box').click(function(){
    if(!$(this).text()){
      if(player === true){
        $(this).text("X");
      } else {
        $(this).text("O");
      }
      //player = !player;
    } else {
      alert("That spot has been taken, try again!");
    }

    var winner = winner2(winCheck,isWinner,$(this).text());
    if(winner === "X"){
      console.log($('#player1').val());
      isWinner = true;
      player = true;
      player1Wins++;
      $('#player1').text(player1Wins);
    } else if (winner === "O") {
      console.log('in o winner');
      isWinner = true;
      player = false;
      var newVal = parseInt($('#player2').val()) + 1;
      player2Wins++;
      $('#player2').text(player2Wins);
    }

    console.log(isWinner);

    if(isWinner){
      var playAgain = prompt("Would you like to play again? 'yes' or 'no'");
      if(playAgain === "yes"){
        isWinner = false;
        $('.box').text('');
        $('.box').css("background-color", "white");
      }
    } else {
      player = !player;
    }


  });

});

function winner2(hash, isWinner, letter){
  for(var key in hash){
    //console.log('win2: ' + $(this).attr("data-position") + " " + $('[data-position="' + hash[key][0] + '"]').text());
    if(
      ($('[data-position="' + hash[key][0] +'"]').text() === $('[data-position="' + hash[key][1] + '"]').text()) &&
      ($('[data-position="' + hash[key][1] +'"]').text() === $('[data-position="' + hash[key][2] + '"]').text()) &&
      ($('[data-position="' + hash[key][1] +'"]').text() === letter)){
        $(key).css("background-color", "green");
        alert(letter + " won with " + key);
        isWinner = true;
        console.log("isWinner from winner2 " + isWinner);
        return letter;
      }
  }
}

var winCheck = {
  '.row1': [0,1,2],
  '.row2': [3,4,5],
  '.row3': [6,7,8],
  '.col1': [0,3,6],
  '.col2': [1,4,7],
  '.col3': [2,5,8],
  '.downDiag': [0,4,8],
  '.upDiag': [6,4,2],
};
