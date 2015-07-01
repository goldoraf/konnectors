// Generated by CoffeeScript 1.9.1
var File, InternetBill, americano, cheerio, fetcher, filterExisting, fs, linkBankOperation, localization, log, logIn, moment, parsePage, request, requestJson, saveDataAndFile;

americano = require('americano-cozy');

requestJson = require('request-json');

request = require('request');

moment = require('moment');

cheerio = require('cheerio');

fs = require('fs');

File = require('../models/file');

fetcher = require('../lib/fetcher');

filterExisting = require('../lib/filter_existing');

saveDataAndFile = require('../lib/save_data_and_file');

linkBankOperation = require('../lib/link_bank_operation');

localization = require('../lib/localization_manager');

log = require('printit')({
  prefix: "Free",
  date: true
});

InternetBill = americano.getModel('InternetBill', {
  date: Date,
  vendor: String,
  amount: Number,
  fileId: String
});

InternetBill.all = function(callback) {
  return InternetBill.request('byDate', callback);
};

module.exports = {
  name: "Free",
  slug: "free",
  description: 'konnector description free',
  vendorLink: "https://www.free.fr/",
  fields: {
    login: "text",
    password: "password",
    folderPath: "folder"
  },
  models: {
    internetbill: InternetBill
  },
  init: function(callback) {
    var map;
    map = function(doc) {
      return emit(doc.date, doc);
    };
    return InternetBill.defineRequest('byDate', map, function(err) {
      return callback(err);
    });
  },
  fetch: function(requiredFields, callback) {
    log.info("Import started");
    return fetcher["new"]().use(logIn).use(parsePage).use(filterExisting(log, InternetBill)).use(saveDataAndFile(log, InternetBill, 'free', ['facture'])).use(linkBankOperation({
      log: log,
      model: InternetBill,
      identifier: 'free telecom',
      dateDelta: 10,
      amountDelta: 0.1
    })).args(requiredFields, {}, {}).fetch(function(err, fields, entries) {
      var localizationKey, notifContent, options, ref;
      log.info("Import finished");
      notifContent = null;
      if ((entries != null ? (ref = entries.filtered) != null ? ref.length : void 0 : void 0) > 0) {
        localizationKey = 'notification free';
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
  var billUrl, form, loginUrl, options;
  loginUrl = "https://subscribe.free.fr/login/login.pl";
  billUrl = "https://adsl.free.fr/liste-factures.pl";
  form = {
    "pass": requiredFields.password,
    "login": requiredFields.login
  };
  options = {
    method: 'POST',
    form: form,
    jar: true,
    url: loginUrl
  };
  return request(options, function(err, res, body) {
    var isError, isNoLocation, isNot302, location, parameters, url;
    isNoLocation = res.headers.location == null;
    isNot302 = res.statusCode !== 302;
    isError = (res.headers.location != null) && res.headers.location.indexOf("error") !== -1;
    if (err || isNoLocation || isNot302 || isError) {
      log.error("Authentification error");
      return next('bad credentials');
    } else {
      location = res.headers.location;
      parameters = location.split('?')[1];
      url = billUrl + "?" + parameters;
      return request.get(url, function(err, res, body) {
        if (err) {
          return next(err);
        } else {
          data.html = body;
          return next();
        }
      });
    }
  });
};

parsePage = function(requiredFields, bills, data, next) {
  var $;
  bills.fetched = [];
  if (data.html == null) {
    return next();
  }
  $ = cheerio.load(data.html);
  $('.pane li').each(function() {
    var amount, bill, date, month, pdfUrl;
    amount = $($(this).find('strong').get(1)).html();
    amount = amount.replace(' Euros', '');
    amount = parseFloat(amount);
    pdfUrl = $(this).find('.last a').attr('href');
    pdfUrl = "https://adsl.free.fr/" + pdfUrl;
    month = pdfUrl.split('&')[2].split('=')[1];
    date = moment(month, 'YYYYMM');
    bill = {
      amount: amount,
      date: date,
      vendor: 'Free'
    };
    if (date.year() > 2011) {
      bill.pdfurl = pdfUrl;
    }
    return bills.fetched.push(bill);
  });
  return next();
};
