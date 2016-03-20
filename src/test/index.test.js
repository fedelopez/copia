"use strict";

var expect = require("chai").expect;
var copia = require("./../index");
var fs = require("fs");
var fse = require("fs-extra");
var path = require("path");

describe("copia", function () {

    beforeEach(function () {
        fse.removeSync("./src/test/public");
        fse.mkdirsSync("./src/test/public/js");
        fse.mkdirsSync("./src/test/public/css");
    });

    it("should copy js assets located on node-modules path to the destination defined on index-hml", function () {
        var config = {"index-html": "./src/test/index.html", "node-modules": "./src/test/node_modules"};
        copia.copia(config);
        expect(fs.readFileSync("./src/test/public/js/codemirror.js", "utf8")).to.equal("//Lorem ipsum dolor sit amet.");
        expect(fs.readFileSync("./src/test/public/js/jquery.min.js", "utf8")).to.equal("//Suspendisse potenti. Ut tellus ante.");
        expect(fs.readFileSync("./src/test/public/js/rx.all.min.js", "utf8")).to.equal("//Fusce quis dolor enim. Proin.");
        expect(fs.readFileSync("./src/test/public/js/rx.dom.min.js", "utf8")).to.equal("//Quisque consectetur rutrum sagittis. Interdum.");
    });

    it("should copy js assets defined with absolute paths", function () {
        var indexHtmlPath = path.resolve("./src/test/index.html");
        var nodeModulesPath = path.resolve("./src/test/node_modules");
        var config = {"index-html": indexHtmlPath, "node-modules": nodeModulesPath};
        copia.copia(config);
        expect(fs.readFileSync("./src/test/public/js/rx.all.min.js", "utf8")).to.equal("//Fusce quis dolor enim. Proin.");
    });

    it("should copy css assets located on node-modules path to the destination defined on index-hml", function () {
        var config = {"index-html": "./src/test/index.html", "node-modules": "./src/test/node_modules"};
        copia.copia(config);
        expect(fs.readFileSync("./src/test/public/css/codemirror.css", "utf8")).to.equal("/*Lorem ipsum dolor sit amet css*/");
        expect(fs.readFileSync("./src/test/public/css/dracula.css", "utf8")).to.equal("/*Duis maximus viverra consectetur. Suspendisse.*/");
    });

});