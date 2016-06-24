/* eslint-disable no-undef */

$(document).ready(init);

function init() {
  $('#newGame').click(newGame);
  $('#guessButton').click(guessLetter);
  $('#game').hide();
  $('#win').hide();
  $('#gameid').hide();
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
      console.log('word', rsp.hang.word);
      $('#name').text(rsp.hang.name);
      $('#timeLeft').text(rsp.hang.timeLeft);
      $('#guesses').text(rsp.hang.guesses);
      $('#word').text(rsp.hang.word);
      $('#gameid').text(rsp.hang._id);
      $('#game').show();
      $('#startNew').hide();
    },
  });
}

function guessLetter() {
  const letter = $('#letter').val();
  const id = $('#gameid').text();
  console.log('id', id);
  console.log('letter', letter);
  // console.log('joe is awesome');
  $.ajax({
    url: `/hangman/${id}`,
    method: 'put',
    dataType: 'json',
    data: { letter },
    success: (rsp) => {
      console.log('rsp', rsp);
      $('#name').text(rsp.name);
      $('#timeLeft').text(rsp.timeLeft);
      $('#guesses').text(rsp.guesses);
      $('#word').text(rsp.word);
      if (rsp.won) {
        $('#win').show();
        $('#letter').hide();
        $('#guessButton').hide();
      }
      console.log('bad mothatrucka:',rsp.bad);
    },
  });
}
