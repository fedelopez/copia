'use strict';

var fs = require("fs");
var fse = require("fs-extra");
var path = require('path');
var walk = require('fs-walk');
var clc = require('cli-color');

var Copia = function (config) {

    var assetsMap = function (html, regex) {
        var assets = [];
        var keepGoing = true;
        while (keepGoing) {
            var asset = regex.exec(html);
            keepGoing = asset && asset.length > 0;
            if (keepGoing) {
                var filePath = asset[1];
                assets.push({"basedir": path.dirname(filePath), "filename": path.basename(filePath)});
            }
        }
        return assets;
    };

    var indexHtml = config["index-html"];
    var nodeModulesDir = config["node-modules"];

    var contents = fs.readFileSync(indexHtml);
    var indexHtmlBasedir = path.dirname(indexHtml);
    var map = assetsMap(contents, /<script\s*(?:type="text\/javascript")?\s*src="(.*?)"><\/script>/g).concat(assetsMap(contents, /<link rel="stylesheet" href="(.*?)">/g));

    var matchedFiles = [];
    walk.walkSync(nodeModulesDir, function (basedir, filename) {
        var asset = map.find(function (asset) {
            return asset.filename === filename;
        });
        if (asset) {
            var src = path.resolve(path.join(basedir, filename));
            var dst = path.resolve(path.join(indexHtmlBasedir, asset.basedir, asset.filename));
            matchedFiles.push({"src": src, "dst": dst});
        }
    });

    if (matchedFiles.length == 0) {
        console.log(clc.red.bold("Nothing to copy from directory <" + nodeModulesDir + ">"));
    } else {
        matchedFiles.forEach(function (matchedFile) {
            fse.copySync(matchedFile.src, matchedFile.dst);
            console.log(clc.green.bold("\nCopied from ") + clc.cyan(matchedFile.src) + clc.green.bold("\nto ") + clc.cyan(matchedFile.dst));
        });
    }
};

module.exports.copia = Copia;