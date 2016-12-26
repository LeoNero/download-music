'use strict';

const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const Youtube = require('youtube-node');
const youtube = new Youtube();

const ytdl = require('youtube-dl');

youtube.setKey('AIzaSyB1OOSpTREs85WUMvIgJvLTZKye4BVsoFU');

const ApiController = {
  search (req, res) {
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

  download (req, res) {
    let videoId = req.params.videoId;
    let url = `http://www.youtube.com/watch?v=${videoId}`;

    let stream = ytdl(url, ['-f', 'bestaudio']);

    stream.on('info', info => {
      let fileNameWithFormat = info._filename;

      let fileNameWithoutFormat = fileNameWithFormat.split('.');
      fileNameWithoutFormat.pop();
      fileNameWithoutFormat = fileNameWithoutFormat.join('.');

      res.setHeader('Content-Disposition', 'attachment; filename=' + fileNameWithoutFormat + '.mp3');
      res.setHeader('Content-Type', 'audio/mpeg3'); 
      res.setHeader('Content-Length', info.size);
    });

    let proc = ffmpeg({source: stream}).withAudioCodec('libmp3lame').toFormat('mp3')
    
    let ffstream = proc.pipe();

    ffstream.on('data', data => {
      res.write(data);
    });

    ffstream.on('end', () => {
      res.end();
    });
  }
};

module.exports = ApiController;


