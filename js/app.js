// wait for the DOM to finish loading

$(document).ready(function() {
  // all code to manipulate the DOM
  // goes inside this function
  var isWinner = false;
  var player = true;

  var playerOne = prompt('Who is player 1? They will be "X" and move first.');
  playerOne = (playerOne || "Player 1");
  var playerTwo = prompt('Who is player 2?');
  playerTwo = (playerTwo || "Player 2");
  var player1Wins = 0;
  var player2Wins = 0;

  $('.player1.name').text(playerOne);
  $('.player2.name').text(playerTwo);

  //selectBox(player,player1, player2);

  /////////Select box///////////////

  $(window).on("click keypress",function(){
    if(player === true){
      $('.player1.name').addClass("player");
      $('.player2.name').removeClass("player");
    } else {
      $('.player1.name').removeClass("player");
      $('.player2.name').addClass("player");
    }
  });

  $('.box').click(function(){
    if(!$(this).text()){
      selectBox(this,player);


      /////////Check if there is a winner////////////

      var winner = winner2(winCheck,isWinner,$(this).text(),playerOne,playerTwo);

      if (winner){
        if(winner === "X"){
          player = true;
          player1Wins++;
          $('.player1.val').text(player1Wins);
        } else if (winner === "O") {
          player = false;
          player2Wins++;
          $('.player2.val').text(player2Wins);
        }

        var response = prompt("Would you like to play again? 'yes' or 'no'");
        boardReset(response,"win");

      } else if ($('.box').text().length === 9){
        var response2 = prompt("Tie! Play again?");
        boardReset(response2,"tie");
      } else if (playerTwo === "computer" || playerTwo === "Arthur") {
        player = !player;
        var computerChoice = computerSelect(winCheck,forkTriCheck,forkArrowCheck,forkSplitCheck,"O","X");
        console.log(computerChoice);
        var boxNum = '[data-position="' + computerChoice +'"]';
        selectBox(boxNum,false);

        var computerWinner= winner2(winCheck, isWinner, "O",playerOne,playerTwo);

        if (computerWinner){
          if(winner === "X"){
            player = true;
            player1Wins++;
            $('.player1.val').text(player1Wins);
          } else if (winner === "O") {
            player = false;
            player2Wins++;
            $('.player2.val').text(player2Wins);
          }

        console.log("computer won");

        var response3 = prompt("Would you like to play again? 'yes' or 'no'");
        boardReset(response3,"win");

        var computerChoice2 = computerSelect(winCheck,forkTriCheck,forkArrowCheck,forkSplitCheck,"O","X");
        console.log(computerChoice2);
        var boxNum2 = '[data-position="' + computerChoice2 +'"]';
        selectBox(boxNum2,false);
        player = !player;


        } else if ($('.box').text().length === 9){
          var response4 = prompt("Tie! Play again?");
          boardReset(response4,"tie");
          if(playerTwo === "computer" || playerTwo === "Arthur"){
            var computerChoice3 = computerSelect(winCheck,forkTriCheck,forkArrowCheck,forkSplitCheck,"O","X");
            console.log(computerChoice3);
            var boxNum3 = '[data-position="' + computerChoice3 +'"]';
            selectBox(boxNum3,false);
            player = !player;
          }
        } else {
          player = !player;
        }



      }
      else {
        player = !player;
      }

    } else {
      alert("That spot has been taken, try again!");
    }

  });

  $(window).on("keypress",function(event){
    if (event.charCode === 49){
      for(var i = 0; i < 9; i ++){
        if(player === true){
          winAvail(winCheck,i,"X");
        } else if(player === false){
          winAvail(winCheck,i,"O");
        }
      }
    }
  });

  $(window).on("keypress",function(event){
    if (event.charCode === 50){
      for(var i = 0; i < 9; i ++){
        if(player === true){
          winAvail(winCheck,i,"O");
        } else if(player === false){
          winAvail(winCheck,i,"X");
        }
      }
    }
  });

  $(window).on("keypress",function(event){
    if (event.charCode === 51){
      if(player === true){
        forkAvail(forkTriCheck,forkArrowCheck,forkSplitCheck,"X");
      } else if(player === false){
        forkAvail(forkTriCheck,forkArrowCheck,forkSplitCheck,"O");
      }
    }
  });

  $(window).on("keypress",function(event){
    if (event.charCode === 52){
      if(player === true){
        forkAvail(forkTriCheck,forkArrowCheck,forkSplitCheck,"O");
      } else if(player === false){
        forkAvail(forkTriCheck,forkArrowCheck,forkSplitCheck,"X");
      }
    }
  });

  $(window).on("keypress",function(event){
    if (event.charCode === 32){
      if(player === true){
        computerSelect(winCheck,forkTriCheck,forkArrowCheck,forkSplitCheck,"X","O");
        console.log(computerSelect(winCheck,forkTriCheck,forkArrowCheck,forkSplitCheck,"X","O"));
      } else if(player === false){
        computerSelect(winCheck,forkTriCheck,forkArrowCheck,forkSplitCheck,"O","X");
        console.log(computerSelect(winCheck,forkTriCheck,forkArrowCheck,forkSplitCheck,"X","O"));
      }
    }
  });


});


function winner2(hash, isWinner, letter,playerOne,playerTwo){
  for(var key in hash){
    if(matchTest(hash[key],letter)){
      $(key).css("background-color", "rgb(255, 223, 153)");
      var winner = "";
      if(letter === "X"){
        winner = playerOne;
      } else {
        winner = playerTwo;
      }
      alert(winner + " won with " + hash[key][3]);
      return letter;
    }
  }
}

function selectBox(box,player){
  if(!$(box).text()){
    if(player === true){
      $(box).text("X");
      $(box).css("border-style", "inset");
    } else {
      $(box).text("O");
      $(box).css("border-style", "inset");
    }
  }
}

function incrementWinner(winner){
  if(winner === "X"){
    player = true;
    player1Wins++;
    $('.player1.val').text(player1Wins);
  } else if (winner === "O") {
    player = false;
    player2Wins++;
    $('.player2.val').text(player2Wins);
  }
}

function boardReset(playAgain, state){
  if(playAgain !== "yes"){
    location.reload();
  } else if (state === "win"){
    alert("Winner goes first!");
  } else {
    alert("Previous winner goes first.");
  }
  isWinner = false;
  $('.box').text('');
  $('.box').css("background-color", "rgba(239, 183, 30, 0.7)");
  $('.box').css("border-style", "outset");
}

function matchTest(arr,letter){
  if(($('[data-position="' + arr[0] +'"]').text() === $('[data-position="' + arr[1] + '"]').text()) &&
  ($('[data-position="' + arr[1] +'"]').text() === $('[data-position="' + arr[2] + '"]').text()) &&
  ($('[data-position="' + arr[1] +'"]').text() === letter)){
    return true;
  }
}

function matchTestLite(arr,letter){
  if(($('[data-position="' + arr[0] +'"]').text() === $('[data-position="' + arr[1] + '"]').text()) &&
  ($('[data-position="' + arr[1] +'"]').text() === letter) &&
  ($('[data-position="' + arr[2] +'"]').text() === "")){
    return true;
  }
}

function shuffle(arr,num){
  var newArr = [];
  for (var i = 0; i < 3; i++){
    if(arr[i] !== num){
      newArr.push(arr[i]);
    }
  }
  newArr.push(num);
  return newArr;
}

function winAvail(hash,position,letter){
  for (var key in hash){
    if((hash[key].includes(position))){
      if(matchTestLite(shuffle(hash[key],position),letter)){
        // $('[data-position="' + position + '"]').toggleClass("answer");
        return position;
      }
    }
  }
}


function forkAvail(hashTri,hashArrow,hashSplit,letter){
  if(forkCheck(hashTri,letter)){
    return forkCheck(hashTri,letter);
  } else if (forkCheck(hashArrow,letter)) {
    return forkCheck(hashArrow,letter);
  } else if (forkCheck(hashSplit,letter)) {
    return forkCheck(hashArrow,letter);
  }
}

function forkCheck(hashCheck,letter){
  for(var key in hashCheck){
    if((($('[data-position="' + hashCheck[key][0] +'"]').text()) === ($('[data-position="' + hashCheck[key][1] +'"]').text())) &&
    (($('[data-position="' + hashCheck[key][0] +'"]').text()) === letter) &&
    (($('[data-position="' + hashCheck[key][2][0] +'"]').text()) === "") &&
    (($('[data-position="' + hashCheck[key][2][1] +'"]').text()) === "") &&
    (($('[data-position="' + hashCheck[key][2][2] +'"]').text()) === "")){
      console.log("shit");
      console.log(hashCheck[key],hashCheck[key][2][0]);
      var test = parseInt(hashCheck[key][2][0]);
      // $('[data-position="' + hashCheck[key][2][0] + '"]').toggleClass("answer");
      return hashCheck[key][2][0];
    }
  }
}

function computerSelect(winCheck,forkTriCheck,forkArrowCheck,forkSplitCheck,letter,oppLetter){

  for(var i = 0; i < 9; i++){
    console.log("forwin");
    if(winAvail(winCheck,i,letter)){
      return winAvail(winCheck,i,letter);
    }
  }
  for(var j = 0; j < 9; j++){
    console.log("forblock");
    if(winAvail(winCheck,j,oppLetter)){
      return winAvail(winCheck,j,oppLetter);
    }
  }

  if(forkAvail(forkTriCheck,forkArrowCheck,forkSplitCheck,letter)){
    return forkAvail(forkTriCheck,forkArrowCheck,forkSplitCheck,letter);
  } else if (forkAvail(forkTriCheck,forkArrowCheck,forkSplitCheck,oppLetter)) {
    return forkAvail(forkTriCheck,forkArrowCheck,forkSplitCheck,oppLetter);
  }

  else if (($('[data-position="4"]').text()) === ""){
    // $('[data-position="4"]').toggleClass("answer");
    return 4;
  }

  else if ((($('[data-position="0"]').text()) === oppLetter) && ($('[data-position="0"]').text() === "")){
    // $('[data-position="8"]').toggleClass("answer");
    return 8;
  } else if ((($('[data-position="2"]').text()) === oppLetter) && ($('[data-position="2"]').text() === "")) {
    // $('[data-position="6"]').toggleClass("answer");
    return 6;
  } else if ((($('[data-position="6"]').text()) === oppLetter) && ($('[data-position="6"]').text() === "")) {
    // $('[data-position="2"]').toggleClass("answer");
    return 2;
  } else if ((($('[data-position="8"]').text()) === oppLetter) && ($('[data-position="8"]').text() === "")) {
    // $('[data-position="0"]').toggleClass("answer");
    return 0;
  }

  else if (checkCorners()){
    return checkCorners();
  }

  else if (checkSides()) {
    return checkSides();
  }
  else {
    console.log("stuck");
    for(var k = 0; k < 9; k++){
      if ($('[data-position="'+ k + '"]').text() === "") {
        return k;
      }
    }
  }
}

function checkSides(){
  var sides = [1,5,7,3];
  for(var i = 0; i < 4; i++){
    if($('[data-position="' + sides[i] +'"]').text() === ""){
      // $('[data-position="' + sides[i] + '"]').toggleClass("answer");
      return sides[i];
    }
  }
}


function checkCorners(){
  var corners = [0,2,6,8];
  for(var i = 0; i < 4; i++){
    if($('[data-position="' + corners[i] +'"]').text() === ""){
      // $('[data-position="' + corners[i] + '"]').toggleClass("answer");
      return corners[i];
    }
  }
}

var winCheck = {
  '.row1': [0,1,2,"row 1"],
  '.row2': [3,4,5,"row 2"],
  '.row3': [6,7,8,"row 3"],
  '.col1': [0,3,6,"column 1"],
  '.col2': [1,4,7,"column 2"],
  '.col3': [2,5,8,"column 3"],
  '.downDiag': [0,4,8,"downward diagonal"],
  '.upDiag': [6,4,2,"upward diagonal"],
};

var probabilities = {
  '0': 1,
  '1': 1,
  '2': 1,
  '3': 1,
  '4': 1,
  '5': 1,
  '6': 1,
  '7': 1,
  '8': 1,
};


var forkArrowCheck = {
  'have1TLArrow': [1,3,[0,2,6]],
  // 'have1TRArrow': [1,5,[2,0,8]],
  // 'have3TLArrow': [3,1,[0,2,6]],
  'have3BLArrow': [3,7,[6,0,8]],
  'have5TRArrow': [5,1,[2,0,8]],
  'have5BRArrow': [5,7,[8,6,2]],
  // 'have7BRArrow': [7,5,[8,6,2]],
  // 'have7BLArrow': [7,3,[6,0,8]],
};

var forkTriCheck = {
  'br': [4,8,[2,5,7]],
  'bl': [4,6,[8,3,7]],
  'tl': [4,0,[6,1,3]],
  'tr': [4,2,[0,1,5]],
  'br2': [4,8,[6,5,7]],
  'bl2': [4,6,[0,3,7]],
  'tl2': [4,0,[2,1,3]],
  'tr2': [4,2,[8,1,5]],
};

var forkSplitCheck = {
  // 'br': [8,0,[2,1,5]],
  'bl': [6,2,[0,1,3]],
  'tl': [0,8,[6,5,7]],
  // 'tr': [2,6,[0,1,3]],
  // 'br2': [8,0,[6,5,7]],
  'bl2': [6,2,[8,5,7]],
  'tl2': [0,8,[2,1,5]],
  // 'tr2': [2,6,[8,5,7]],
};
