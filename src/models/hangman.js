/* eslint-disable func-names */

import mongoose from 'mongoose';
const Schema = mongoose.Schema;
// const source = '/usr/share/dict/web2';

const hangmanSchema = new Schema({
  name: String,
  guesses: [{ letter: String }],
  timeLeft: Number,
  word: { type: String, default: 'hello' },
  won: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

hangmanSchema.methods.getNewWord = function () {
  return 'hello';
};

hangmanSchema.methods.getBlankWork = function () {
  return [' ', ' ', ' ', ' ', ' '];
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
