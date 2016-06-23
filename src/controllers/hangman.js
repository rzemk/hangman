/* eslint-disable new-cap */

import express from 'express';
import Hangman from '../models/hangman';

const router = module.exports = express.Router();

router.get('/', (req, res) => {
  res.render('home/hangman');
});

router.post('/', (req, res) => {
  // console.log('here');
  Hangman.newMethod();
  const hang = new Hangman(req.body);
  hang.save(() => {
    res.send({ hang });
  });
});

router.put('/', (req, res) => {
  res.render('home/hangman');
});
