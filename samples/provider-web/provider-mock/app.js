/**
 * @author 525882
 */
var apiMocker = require("apimocker");

var url = require('url');

var fs = require('fs');


var customMiddleware = function(req, res, next) {
       next();
    };
var mocker = apiMocker.createServer({quiet: false}).setConfigFile("config.json");
mocker.middlewares.unshift(customMiddleware);
mocker.start(null);