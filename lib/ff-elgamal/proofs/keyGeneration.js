"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.generate = void 0;
var index_1 = require("../../index");
var index_2 = require("../index");
var web3 = require('web3');
var log = false;
var generateChallenge = function (q, uniqueID, h_, b) {
    var c = web3.utils.soliditySha3(uniqueID, h_, b);
    c = web3.utils.toBN(c);
    c = c.mod(q);
    return c;
};
exports.generate = function (params, keyPair, id) {
    index_2.isSystemParameters(params);
    index_2.isKeyPair(keyPair);
    var p = params.p, q = params.q, g = params.g;
    var h = keyPair.h, sk = keyPair.sk;
    var a = index_1.GlobalHelper.getSecureRandomValue(q);
    var b = index_1.GlobalHelper.powBN(g, a, p);
    var c = generateChallenge(q, id, h, b);
    var d = index_1.GlobalHelper.addBN(a, index_1.GlobalHelper.mulBN(c, sk, q), q);
    return { c: c, d: d };
};
exports.verify = function (params, proof, h, id) {
    index_2.isSystemParameters(params);
    var p = params.p, q = params.q, g = params.g;
    var c = proof.c, d = proof.d;
    var b = index_1.GlobalHelper.divBN(index_1.GlobalHelper.powBN(g, d, p), index_1.GlobalHelper.powBN(h, c, p), p);
    var c_ = generateChallenge(q, id, h, b);
    var hashCheck = index_1.GlobalHelper.timingSafeEqualBN(c, c_);
    var gPowD = index_1.GlobalHelper.powBN(g, d, p);
    var bhPowC = index_1.GlobalHelper.mulBN(b, index_1.GlobalHelper.powBN(h, c, p), p);
    var dCheck = index_1.GlobalHelper.timingSafeEqualBN(gPowD, bhPowC);
    log && console.log('do the hashes match?\t', hashCheck);
    log && console.log('g^d == b * h^c?\t', dCheck);
    log && console.log();
    return hashCheck && dCheck;
};
