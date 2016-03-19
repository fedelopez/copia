"use strict";

var expect = require("chai").expect;
var copia = require("./../index");
var fs = require("fs");

describe("copia", function () {

    beforeEach(function () {
        //todo properly init the "public" directory
        //fs.rmdirSync("./public");
        //fs.mkdirSync("./src/test/public");
    });

    var config = {"index-html": "./src/test/index.html", "node-modules": "./src/test/node_modules"};

    it("should copy js assets located on node-modules path to the destination defined on index-hml", function () {
        copia.copia(config);
        expect(fs.readFileSync("./src/test/public/js/codemirror.js", "utf8")).to.equal("//Lorem ipsum dolor sit amet.");
        expect(fs.readFileSync("./src/test/public/js/jquery.min.js", "utf8")).to.equal("//Suspendisse potenti. Ut tellus ante.");
        expect(fs.readFileSync("./src/test/public/js/rx.all.min.js", "utf8")).to.equal("//Fusce quis dolor enim. Proin.");
        expect(fs.readFileSync("./src/test/public/js/rx.dom.min.js", "utf8")).to.equal("//Quisque consectetur rutrum sagittis. Interdum.");
    });

});