const express = require('express');
const router = express.Router();

const Song = require('../models/song');

router.get('/', async (req, res) => {
  const songs = await Song.find();
  res.json(songs);
});

router.get('/:id', async (req, res) => {
  const songs = await Song.findById(req.params.id);
  res.json(songs);
});

router.post('/', async (req, res) => {
  const { artist, dateSong, name, genere, visit } = req.body;
  const songs = new Song({artist, dateSong, name, genere, visit});
  await songs.save();
  res.json({status: 'Song Saved'});
});

router.put('/:id', async (req, res) => {
  const { artist, dateSong, name, genere, visit } = req.body;
  const newSong = {artist, dateSong, name, genere, visit};
  await Song.findByIdAndUpdate(req.params.id, newSong);
  res.json({status: 'Song Updated'});
});

router.delete('/:id', async (req, res) => {
  await Song.findByIdAndRemove(req.params.id);
  res.json({status: 'Song Deleted'});
});

module.exports = router;
