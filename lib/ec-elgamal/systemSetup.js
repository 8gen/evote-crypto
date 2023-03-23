"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.combinePrivateKeys = exports.combinePublicKeys = exports.generateKeyPair = exports.generateSystemParameters = void 0;
var index_1 = require("../index");
var index_2 = require("./index");
var curve_1 = require("./curve");
exports.generateSystemParameters = function () {
    return { p: index_2.Curve.p, n: index_2.Curve.n, g: index_2.Curve.g };
};
exports.generateKeyPair = function () {
    var keyPair = curve_1.curveDefinition.genKeyPair();
    var sk = keyPair.getPrivate();
    var h = keyPair.getPublic();
    return { h: h, sk: sk };
};
exports.combinePublicKeys = function (publicKeyShares) {
    return publicKeyShares.reduce(function (product, share) { return index_2.Helper.ECmul(product, share); });
};
exports.combinePrivateKeys = function (params, privateKeyShares) {
    return privateKeyShares.reduce(function (sum, share) { return index_1.GlobalHelper.addBN(sum, share, params.n); });
};
