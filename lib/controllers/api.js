'use strict';

var fs = require('fs');

function sendProcessingError(req, res, err) {
  res.status(500).send(err);
  res.end();
}

exports.responseOk = function(req, res) {
  return res.json({message: 'ok'});
};

exports.speakersData = function(req, res) {

};

exports.eventsData = function(req, res) {

};

exports.upload = function(req, res) {

  var path, newPath, fileName, folder = '';

  if (req.files && req.body.type && req.files.Filedata && req.files.Filedata.ws && req.files.Filedata.path) {

    if (req.body.type == 'event') {
      folder = 'event_logos';
    }
    else if (req.body.type == 'speaker') {
      folder = 'speaker_photos';
    }

    path = req.files.Filedata.ws.path;

    fs.readFile(path, function (err, data) {

      if (err) {
        sendProcessingError(req, res, err);
      }

      fileName = req.files.Filedata.originalFilename
      newPath = __dirname.split('/');
      newPath.length = newPath.length - 2;
      newPath = newPath.join('/') + '/app/images/' + folder + '/' + fileName;

      fs.writeFile(newPath, data, function (err) {
        if (err) {
          sendProcessingError(req, res, err);
        }
        res.status(200).send('images/' + folder + '/' + fileName);
        res.end();
      });

    });

  }
  else {
    sendProcessingError(req, res, 'Processing file error');
  }

};
