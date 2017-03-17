<<<<<<< HEAD
// Generated by CoffeeScript 1.10.0
=======
// Generated by CoffeeScript 1.11.1
>>>>>>> c198a158ff5a25d0a6a270670086d5d2002f5ca3
var Commit, async, buildDuplicatedArrays, count, deleteDuplicates, log;

async = require('async');

Commit = require('../models/commit');

log = require('printit')({
  prefix: 'konnectors'
});

count = 0;

module.exports = function(callback) {
  count = 0;
  log.info('looking for duplicated commits...');
  return Commit.all(function(err, commits) {
    var duplicatesArray;
    duplicatesArray = buildDuplicatedArrays(commits);
    return async.eachSeries(duplicatesArray, function(duplicates, next) {
      var ref;
      if ((ref = duplicates.length) === 0 || ref === 1) {
        return next();
      } else {
        return deleteDuplicates(duplicates, next);
      }
    }, function(err) {
      log.info("deleted duplicated commits: " + count);
      return callback();
    });
  });
};

buildDuplicatedArrays = function(commits) {
  var commit, i, len, name, res, shaHash;
  shaHash = {};
  if (commits != null) {
    for (i = 0, len = commits.length; i < len; i++) {
      commit = commits[i];
      if (shaHash[name = commit.sha] == null) {
        shaHash[name] = [];
      }
      shaHash[commit.sha].push(commit);
    }
    res = Object.keys(shaHash).map(function(key) {
      return shaHash[key];
    });
  } else {
    res = [];
  }
  return res;
};

deleteDuplicates = function(duplicates, callback) {
  var commit;
  commit = duplicates.pop();
  if ((commit != null) && (duplicates != null ? duplicates.length : void 0) > 0) {
    log.info("Delete " + duplicates.length + " commits for commit " + commit.sha);
  }
  return async.eachSeries(duplicates, function(duplicate, next) {
    return duplicate.destroy(function(err) {
      if (err) {
        log.error(err);
      } else {
        count++;
      }
      return next();
    });
  }, function(err) {
    return callback();
  });
};
