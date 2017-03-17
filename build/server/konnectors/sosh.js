<<<<<<< HEAD
// Generated by CoffeeScript 1.10.0
=======
// Generated by CoffeeScript 1.11.1
>>>>>>> c198a158ff5a25d0a6a270670086d5d2002f5ca3
var Bill, cheerio, cozydb, fetcher, filterExisting, linkBankOperation, localization, log, logIn, moment, parsePage, request, saveDataAndFile;

cozydb = require('cozydb');

request = require('request');

moment = require('moment');

cheerio = require('cheerio');

fetcher = require('../lib/fetcher');

filterExisting = require('../lib/filter_existing');

saveDataAndFile = require('../lib/save_data_and_file');

linkBankOperation = require('../lib/link_bank_operation');

localization = require('../lib/localization_manager');

log = require('printit')({
  prefix: "Sosh",
  date: true
});

Bill = require('../models/bill');

module.exports = {
  name: "Sosh",
  slug: "sosh",
  description: 'konnector description sosh',
  vendorLink: "https://www.sosh.fr/",
  category: 'telecom',
  color: {
    hex: '#03A0AA',
    css: '#03A0AA'
  },
  fields: {
    login: {
      type: "text"
    },
    password: {
      type: "password"
    },
    folderPath: {
      type: "folder",
      advanced: true
    }
  },
<<<<<<< HEAD
=======
  dataType: ['bill'],
>>>>>>> c198a158ff5a25d0a6a270670086d5d2002f5ca3
  models: {
    bill: Bill
  },
  init: function(callback) {
    return callback();
  },
  fetch: function(requiredFields, callback) {
    log.info("Import started");
    return fetcher["new"]().use(logIn).use(parsePage).use(filterExisting(log, Bill)).use(saveDataAndFile(log, Bill, 'sosh', ['bill'])).use(linkBankOperation({
      log: log,
      model: Bill,
      identifier: 'sosh',
      dateDelta: 4,
      amountDelta: 5
    })).args(requiredFields, {}, {}).fetch(function(err, fields, entries) {
      var localizationKey, notifContent, options, ref;
      log.info("Import finished");
      notifContent = null;
      if ((entries != null ? (ref = entries.filtered) != null ? ref.length : void 0 : void 0) > 0) {
        localizationKey = 'notification bills';
        options = {
          smart_count: entries.filtered.length
        };
        notifContent = localization.t(localizationKey, options);
      }
      return callback(err, notifContent);
    });
  }
};

logIn = function(requiredFields, billInfos, data, next) {
  var billOptions, logInOptions, signInOptions;
  logInOptions = {
    method: 'GET',
    jar: true,
    url: "https://id.orange.fr/auth_user/bin/auth_user.cgi" + "?service=sosh2&return_url=http%3A%2F%2Fclientsosh.orange.fr"
  };
  signInOptions = {
    method: 'POST',
    jar: true,
    url: "https://id.orange.fr/auth_user/bin/auth_user.cgi",
    form: {
      'credential': requiredFields.login,
      'password': requiredFields.password
    }
  };
  billOptions = {
    method: 'GET',
    jar: true,
    url: "https://m.espaceclientv3.orange.fr/?page=factures-archives"
  };
  log.info('Get login form');
  return request(logInOptions, function(err, res, body) {
    if (err) {
      log.info(err);
      return next('request error');
    }
    log.info('Logging in');
    return request(signInOptions, function(err, res, body) {
      if (err) {
        log.error('Login failed');
        log.raw(err);
        return next('bad credentials');
      }
      log.info('Fetch bill info');
      return request(billOptions, function(err, res, body) {
        if (err) {
          log.error('An error occured while fetching bills');
          console.log(err);
          return next('request error');
        }
        log.info('Fetch bill info succeeded');
        data.html = body;
        return next();
      });
    });
  });
};

parsePage = function(requiredFields, bills, data, next) {
  var $;
  bills.fetched = [];
  $ = cheerio.load(data.html);
  log.info('Parsing bill pages');
  $('ul.factures li').each(function() {
    var bill, firstCell, secondCell, thirdCell;
    firstCell = $(this).find('span.date');
    secondCell = $($(this).find('span.montant'));
    thirdCell = $($(this).find('span.telecharger'));
    bill = {
      date: moment(firstCell.html(), 'DD/MM/YYYY'),
      amount: parseFloat(secondCell.html().replace(' €', '').replace(',', '.')),
      pdfurl: thirdCell.find('a').attr('href'),
      type: 'phone',
      vendor: 'Sosh'
    };
    if ((bill.date != null) && (bill.amount != null)) {
      return bills.fetched.push(bill);
    }
  });
  log.info("Bill retrieved: " + bills.fetched.length + " found");
  return next();
};
