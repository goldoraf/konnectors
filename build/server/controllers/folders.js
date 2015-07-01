// Generated by CoffeeScript 1.9.1
var Folder;

Folder = require('../models/folder');

module.exports = {
  all: function(req, res, next) {
    return Folder.all(function(err, folders) {
      if (err) {
        return next(err);
      } else {
        return res.send(folders);
      }
    });
  },
  show: function(req, res, next) {
    var id;
    id = req.params.folderId;
    return Folder.find(id, function(err, folder) {
      if (err) {
        return next(err);
      } else if (folder === null) {
        return res.sendStatus(404);
      } else {
        return res.send(folder);
      }
    });
  }
};
