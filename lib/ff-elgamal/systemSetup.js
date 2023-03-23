"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.combinePrivateKeys = exports.combinePublicKeys = exports.generateSystemParametersAndKeysZKP = exports.generateSystemParametersAndKeys = exports.generateKeyPair = exports.generateSystemParameters = void 0;
var index_1 = require("../index");
var index_2 = require("./index");
exports.generateSystemParameters = function (p, g) {
    return {
        p: index_1.GlobalHelper.newBN(p),
        q: index_1.GlobalHelper.newBN(index_2.Helper.getQofP(p)),
        g: index_1.GlobalHelper.newBN(g),
    };
};
exports.generateKeyPair = function (sp) {
    index_2.isSystemParameters(sp);
    var sk = index_1.GlobalHelper.getSecureRandomValue(sp.q);
    var h = index_1.GlobalHelper.powBN(sp.g, sk, sp.p);
    return { h: h, sk: sk };
};
exports.generateSystemParametersAndKeys = function (p, g) {
    var sysParams = exports.generateSystemParameters(p, g);
    var keyPair = exports.generateKeyPair(sysParams);
    return [sysParams, keyPair];
};
exports.generateSystemParametersAndKeysZKP = function (p, g) {
    var sysParams = exports.generateSystemParameters(p, g);
    var keyPair = exports.generateKeyPair(sysParams);
    var test1 = index_1.GlobalHelper.powBN(sysParams.g, sysParams.q, sysParams.p);
    if (!test1.eq(index_1.GlobalHelper.newBN(1))) {
        throw new Error("g^q mod p != 1 (== " + test1.toNumber() + ". for p: " + p + ", q: " + sysParams.q.toNumber() + " and g: " + g);
    }
    var test2 = index_1.GlobalHelper.powBN(keyPair.h, sysParams.q, sysParams.p);
    if (!test2.eq(index_1.GlobalHelper.newBN(1))) {
        throw new Error("h^q mod p != 1 (== " + test2.toNumber() + ". for p: " + p + ", q: " + sysParams.q.toNumber() + " and g: " + g);
    }
    var test3 = keyPair.h.mod(sysParams.p);
    if (test3.eq(index_1.GlobalHelper.newBN(1))) {
        throw new Error("h mod p == 1. for p: " + p + ", q: " + sysParams.q.toNumber() + " and g: " + g);
    }
    return [sysParams, keyPair];
};
exports.combinePublicKeys = function (params, publicKeyShares) {
    index_2.isSystemParameters(params);
    return publicKeyShares.reduce(function (product, share) { return index_1.GlobalHelper.mulBN(product, share, params.p); });
};
exports.combinePrivateKeys = function (params, privateKeyShares) {
    index_2.isSystemParameters(params);
    return privateKeyShares.reduce(function (sum, share) { return index_1.GlobalHelper.addBN(sum, share, params.q); });
};
