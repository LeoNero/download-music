'use strict';

const fs = require('fs');
const Youtube = require('youtube-node');
const youtube = new Youtube();

const ytdl = require('youtube-dl');

youtube.setKey('AIzaSyB1OOSpTREs85WUMvIgJvLTZKye4BVsoFU');

const ApiController = {
  search(req, res) {
    let q = req.params.q;

    youtube.search(q, 20, (err, result) => {
      if (err) {
        res.status(500).json(err);
        throw err;
      }
      
      let filteredResult = result.items.filter(value => {
        return value.id.kind === 'youtube#video';
      });

      res.status(200).json(filteredResult);
    });
  },

  download(req, res) {
    let videoId = req.body.videoId;
    let videoTitle = req.body.videoTitle;
    let url = `http://www.youtube.com/watch?v=${videoId}`;

    console.log(url);
  }
};

module.exports = ApiController;


