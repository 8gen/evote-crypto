"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.generate = exports.generateChallenge = void 0;
var index_1 = require("../../index");
var index_2 = require("../index");
var web3 = require('web3');
exports.generateChallenge = function (n, uniqueID, h_, b) {
    var pointsAsString = index_2.Helper.curvePointsToString([h_, b]);
    var hashString = web3.utils.soliditySha3(uniqueID, pointsAsString);
    var c = web3.utils.toBN(hashString);
    c = c.mod(n);
    return c;
};
exports.generate = function (params, share, id) {
    var n = params.n;
    var h = share.h, sk = share.sk;
    var keyPair = index_2.SystemSetup.generateKeyPair();
    var a = keyPair.sk;
    var b = keyPair.h;
    var c = exports.generateChallenge(n, id, h, b);
    var d = index_1.GlobalHelper.addBN(a, index_1.GlobalHelper.mulBN(c, sk, n), n);
    return { c: c, d: d };
};
exports.verify = function (params, proof, h_, id) {
    var log = false;
    var n = params.n, g = params.g;
    var c = proof.c, d = proof.d;
    var b = index_2.Helper.ECdiv(index_2.Helper.ECpow(g, d), index_2.Helper.ECpow(h_, c));
    var c_ = exports.generateChallenge(n, id, h_, b);
    var hashCheck = c.eq(c_);
    var gPowd = index_2.Helper.ECpow(g, d);
    var bhPowC = index_2.Helper.ECmul(b, index_2.Helper.ECpow(h_, c));
    var dCheck = gPowd.eq(bhPowC);
    log && console.log('do the hashes match?\t', hashCheck);
    log && console.log('g^d == b * h_^c?\t', dCheck);
    log && console.log();
    return hashCheck && dCheck;
};
