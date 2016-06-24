/* eslint-disable new-cap, array-callback-return */

import express from 'express';
import Hangman from '../models/hangman';

const router = module.exports = express.Router();

router.get('/', (req, res) => {
  res.render('home/hangman');
});

router.post('/', (req, res) => {
  // console.log('here');
  // Hangman.newMethod();
  const hang = new Hangman(req.body);
  hang.save(() => {
    hang.getNewWord();
    res.send({ hang });
  });
});

router.put('/:id', (req, res) => {
  Hangman.findById(req.params.id, (err, hangman) => {
    console.log('letter',req.body.letter);
    hangman.guesses.push(req.body.letter);
    console.log('guesses', hangman.guesses);
    hangman.update(hangman, () => {
      hangman.getNewWord();
      res.send({ hangman, bad: hangman.bad });
    });
  });
});
