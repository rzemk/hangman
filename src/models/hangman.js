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
  let a = '';
  let bad = 0;
  let win = true;
  for (let i = 0; i < this.word.length; i++) {
    if (this.guesses.find((l) => l === this.word[i])) {
      a = a.concat(this.word[i], ' ');
    } else {
      a = a.concat('_ ');
      win = false;
    }
  }
  // get count of bad guesses
  bad = this.guesses.filter((v) => !(this.word.indexOf(v) + 1)).length;
  this.guesses = this.guesses.join(' ');
  this.bad = bad;
  this.won = win;
  this.word = a;
};

module.exports = mongoose.model('Hangman', hangmanSchema);
