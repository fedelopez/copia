'use strict';

var fs = require("fs");
var fse = require("fs-extra");
var path = require('path');
var walk = require('fs-walk');

var Copia = function (config) {

    var assetNamesMap = function (html) {
        var assets = [];
        var regex = /<script src="(.*?)"><\/script>/g;
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
    var assetsMap = assetNamesMap(contents);

    walk.walkSync(nodeModulesDir, function (basedir, filename) {
        var asset = assetsMap.find(function (asset) {
            return asset.filename === filename;
        });
        if (asset) {
            var src = path.join(process.cwd(), basedir, filename);
            var dst = path.join(process.cwd(), indexHtmlBasedir, asset.basedir, asset.filename);
            console.log("Copia src:<" + src + "> to dst:<" + dst + ">");
            fse.copySync(src, dst);
        }
    });
};

module.exports.copia = Copia;