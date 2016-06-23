/* eslint-disable no-undef */

$(document).ready(init);

function init() {
  $('#newGame').click(newGame);
  $('#guessButton').click(guessLetter);
  $('#game').hide();
}

function newGame() {
  const name = $('#name').val();
  // console.log('joe is awesome');
  $.ajax({
    url: '/hangman/',
    method: 'post',
    dataType: 'json',
    data: { name },
    success: (rsp) => {
      console.log('rsp', rsp);
      $('#name').text(rsp.hang.name);
      $('#timeLeft').text(rsp.hang.timeLeft);
      $('#guesses').text(rsp.hang.guesses);
      $('#game').show();
      $('#startNew').hide();
    },
  });
}

function guessLetter() {

}
