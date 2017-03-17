/**
* MAIF Cozy's konnector
*/

'use strict';

var request = require('request');
var moment = require('moment');
var uuid = require('uuid');
var cozydb = require('cozydb');
var factory = require('../lib/base_konnector');
var MaifUser = require('../models/maif/user');

var connectUrl = 'https://connect.maif.fr/connect';
var apikey = 'eeafd0bd-a921-420e-91ce-3b52ee5807e8';
var infoUrl = 'https://openapiweb.maif.fr/prod/cozy/v1/mes_infos?apikey=' + apikey;
var clientId = '2921ebd6-5599-4fa6-a533-0537fac62cfe';
var secret = 'Z_-AMVTppsgj_F9tRLXfwUm6Wdq8OOv5a4ydDYzvbhFjMcp8aM90D0sdNp2kdaEczeGH_qYZhhd9JIzWkoWdGw';

var scope = 'openid+profile+offline_access';
var type = 'code';
var b64Client = new Buffer(clientId + ':' + secret).toString('base64');
var state = '';
var nonce = '';

if (state === '') {
  state = uuid();
}

if (nonce === '') {
  nonce = uuid();
}

var connector = module.exports = factory.createNew({
  name: 'MAIF',
  customView: '<%t konnector customview maif %>',
  // connectUrl: '${getConnectUrl()}&redirect_uri=',
  connectUrl: connectUrl + '/authorize?response_type=' + type + '&client_id=' + clientId + '&scope=' + scope + '&state=' + state + '&nonce=' + nonce + '&redirect_uri=',

<<<<<<< HEAD
=======
  color: {
    hex: '#007858',
    css: '#007858'
  },

>>>>>>> c198a158ff5a25d0a6a270670086d5d2002f5ca3
  fields: {
    code: {
      type: 'hidden' // To get the Auth code returned on the redirection.
    },
    redirectPath: {
      type: 'hidden'
    },
    refreshToken: {
      type: 'hidden' // refreshToken
    }
  },

<<<<<<< HEAD
=======
  dataType: ['bill', 'contact'],

>>>>>>> c198a158ff5a25d0a6a270670086d5d2002f5ca3
  models: [MaifUser],
  fetchOperations: [refreshToken, saveTokenInKonnector, fetchData, createOrUpdateInDB]
});

function refreshToken(requiredFields, entries, data, next) {
  connector.logger.info('refreshToken');

  if (requiredFields.refreshToken && requiredFields.refreshToken !== '') {
    // Get a new access_token using the refreshToken.
    fetchToken({
      grant_type: 'refresh_token',
      refresh_token: requiredFields.refreshToken
    }, requiredFields, data, next);
  } else if (requiredFields.code && requiredFields.code !== '') {
    // Obtain tokens with the auth code.
    buildCallbackUrl(requiredFields, function (err, redirectUrl) {
      if (err) {
        return next(err);
      }
      fetchToken({
        grant_type: 'authorization_code',
        code: requiredFields.code,
        state: state,
        nonce: nonce,
        redirect_uri: redirectUrl
      }, requiredFields, data, next);
    });
  } else {
    next('token not found'); // Need to perform OpenIdConnect steps.
  }
}

function fetchToken(form, requiredFields, data, next) {
  connector.logger.info('fetchToken');

  request.post({
    url: connectUrl + '/token',
    json: true,
    headers: {
      Authorization: 'Basic ' + b64Client
    },
    form: form
  }, function (err, response, body) {
    if (response.statusCode !== 200 && response.statusCode !== '200') {
      connector.logger.error('fetchToken error: ' + response.statusCode + ' - ' + response.statusMessage);
      err = 'token not found';
    }

    if (err) {
      return next(err);
    }

    if (!body.id_token || !body.refresh_token) {
      connector.logger.error('no token in body: ' + body);
      return next('token not found');
    }

    data.accessToken = body.id_token;
    requiredFields.refreshToken = body.refresh_token;

    next();
  });
}

function buildCallbackUrl(requiredFields, callback) {
  cozydb.api.getCozyDomain(function (err, domain) {
    if (err) {
      connector.logger.error(err);
      return callback('internal error');
    }

    var url = null;
    var error = null;
    try {
      var path = requiredFields.redirectPath.split('?')[0];
      if (path[0] === '/') {
        path = path.slice(1);
      }
      url = domain + 'apps/konnectors/' + path;
    } catch (e) {
      connector.logger.error(e);
      error = 'internal error';
    }
    callback(error, url);
  });
}

// Save konnector's fieldValues during fetch process.
function saveTokenInKonnector(requiredFields, entries, data, next) {
  connector.logger.info('saveTokenInKonnector');

  // Disable eslint because we can't require models/konnector at the top
  // of this file (or Konnector will be empty). It's because in the require
  // tree of models/konnector, there is the current file.
  //eslint-disable-next-line
  var Konnector = require('../models/konnector');

  Konnector.get(connector.slug, function (err, konnector) {
    if (err) {
      connector.logger.error(err);
      return next('internal error');
    }

    konnector.updateFieldValues({ accounts: [requiredFields] }, next);
  });
}

function fetchData(requiredFields, entries, data, next) {
  connector.logger.info('fetchData');

  request.get({
    url: infoUrl,
    json: true,
    headers: {
      Authorization: 'Bearer ' + data.accessToken
    }
  }, function (err, response, body) {
    if (response.statusCode !== 200 && response.statusCode !== '200') {
      connector.logger.error('fetchToken error: ' + response.statusCode + ' - ' + response.statusMessage);
      err = 'request error';
    }

    if (err) {
      return next(err);
    }
    moment.locale('fr');
    entries.maifusers = [{
      profile: body,
      date: moment().format('LLL')
    }];
    next();
  });
}

function createOrUpdateInDB(requiredFields, entries, data, next) {
  connector.logger.info('createOrUpdateInDB');

  MaifUser.updateOrCreate(entries.maifusers[0], function (err) {
    if (err) {
      connector.logger.error(err);
      return next('internal error');
    }

    next();
  });
}