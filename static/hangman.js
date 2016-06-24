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
      $('#name').text(rsp.hangman.name);
      $('#timeLeft').text(rsp.hangman.timeLeft);
      $('#guesses').text(rsp.hangman.guesses);
      $('#word').text(rsp.hangman.word);
      if (rsp.won) {
        $('#win').show();
        $('#letter').hide();
        $('#guessButton').hide();
      }
      console.log('bad mothatrucka:',rsp.bad);
      switch (rsp.bad) {
        case 0:
          break;
        case 1:
          $('#pic').append('<img src=./img/hang_1.jpg>');
          break;
        case 2:
          $('#pic').empty();
          $('#pic').append('<img src=./img/hang_2.jpg>');
          break;
        case 3:
          $('#pic').empty();
          $('#pic').append('<img src=./img/hang_3.jpg>');
          break;
        case 4:
          $('#pic').empty();
          $('#pic').append('<img src=./img/hang_4.jpg>');
          break;
        case 5:
          $('#pic').empty();
          $('#pic').append('<img src=./img/hang_5.jpg>');
          break;
        case 6:
          $('#pic').empty();
          $('#pic').append('<img src=./img/hang_6.jpg>');
          break;
      }
    },
  });
}
