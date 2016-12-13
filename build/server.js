// Generated by CoffeeScript 1.10.0
var RealtimeAdapter, americano, application, commitPatch, initKonnectors, localization, log, params, poller;

americano = require('americano');

RealtimeAdapter = require('cozy-realtime-adapter');

localization = require('./server/lib/localization_manager');

initKonnectors = require('./server/init/konnectors');

poller = require('./server/lib/poller');

commitPatch = require('./server/init/patch_commits');

log = require('printit')({
  prefix: 'konnectors'
});

process.env.TZ = 'UTC';

params = {
  name: 'konnectors',
  port: process.env.PORT || 9358,
  host: process.env.HOST || '127.0.0.1',
  root: __dirname
};

application = module.exports = function(callback) {
  return americano.start(params, function(err, app, server) {
    var error, hash, realtime;
    realtime = RealtimeAdapter(server, ['konnector.update', 'folder.*']);
    localization.initialize(function() {
      return initKonnectors(function() {
        poller.start();
        log.info('Import poller started.');
        if (callback != null) {
          return callback(app, server);
        }
      });
    });
    try {
      hash = "." + (require('./assets').hash);
    } catch (error) {
      hash = '';
    }
    return app.locals.hash = hash;
  });
};

if (!module.parent) {
  application();
}