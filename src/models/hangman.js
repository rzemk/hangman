/* eslint-disable func-names */

import mongoose from 'mongoose';
const Schema = mongoose.Schema;
// const source = '/usr/share/dict/web2';

const hangmanSchema = new Schema({
  name: String,
  guesses: { type: Array, default: [] },
  timeLeft: Number,
  word: { type: String, default: 'hello' },
  won: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

hangmanSchema.methods.getNewWord = function () {
  let i = 0;
  const a = [];
  let bad = 0;
  let win = true;
  for (i = 0; i < this.word.length; i++) {
    const letter = this.word.charAt(i);
    if (this.guesses.find((l) => l === letter.toString())) {
      a.push(letter);
    } else {
      a.push('_');
      win = false;
    }
  }
  for (i = 0; i < this.guesses.length; i++) {
    if (a.find(a => !(a === this.guesses[i]))) {
      bad++;
    }
    console.log('weiner', bad);
  }
  console.log('win', win);
  this.bad = bad;
  this.won = win;
  this.word = a;
};

module.exports = mongoose.model('Hangman', hangmanSchema);


/*
Dictionary.getNewWord() {
  // read from source (dictionary)
  return 'hello';
}

Dictionary.blank = function () {
  return
}
*/
