// wait for the DOM to finish loading

$(document).ready(function() {
  // all code to manipulate the DOM
  // goes inside this function

  var player = true;
  $('.box').click(function gamePlay(){
    if(!$(this).text()){
      if(player === true){
        $(this).text("X");
      } else {
        $(this).text("O");
      }
      player = !player;
    } else {
      alert("That spot has been taken, try again!");
    }

    winner2(winCheck,$('.box'),$(this).text());
  });

});

function winner2(hash, arr, letter){
  for(var key in hash){
    //console.log('win2: ' + $(this).attr("data-position") + " " + $('[data-position="' + hash[key][0] + '"]').text());
    if(
      ($('[data-position="' + hash[key][0] +'"]').text() === $('[data-position="' + hash[key][1] + '"]').text()) &&
      ($('[data-position="' + hash[key][1] +'"]').text() === $('[data-position="' + hash[key][2] + '"]').text()) &&
      ($('[data-position="' + hash[key][1] +'"]').text() === letter)){
        $(key).css("background-color", "green");
        alert(letter + " won with " + key);
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
