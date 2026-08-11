/**
 * Created by daisy on 15/4/14.
 */
var util = require('util');
var mongoose = require('mongoose');
var debug = require('debug')('mongooses');

function Mongooses(options) {
    debug('options', options);
    Mongooses.options = options;
}

Mongooses.connect = function (name) {
    var db = mongoose.createConnection(util.format('mongodb://%s:%s/%s', Mongooses.options.host, Mongooses.options.port, name));
    db.on('error', function (err) {
        debug('failed to connect', err);
        Mongooses.connect(name);
    });
    db.on('open', function () {
        debug('opened');
    });
    Mongooses.dbs[name] = db;
};

Mongooses.dbs = {};

Mongooses.db = function (name) {
    if (typeof Mongooses.dbs[name] === 'undefined') {
        Mongooses.connect(name);
    }
    return Mongooses.dbs[name];
};

module.exports = Mongooses;