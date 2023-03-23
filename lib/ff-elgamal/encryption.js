"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.combineDecryptedShares = exports.decryptShare = exports.add = exports.decrypt2 = exports.decrypt1 = exports.encrypt = exports.decodeMessage = exports.encodeMessage = void 0;
var index_1 = require("../index");
var index_2 = require("./index");
exports.encodeMessage = function (m, sysParams) {
    index_2.isSystemParameters(sysParams);
    m = typeof m === 'number' ? index_1.GlobalHelper.newBN(m) : m;
    return index_1.GlobalHelper.powBN(sysParams.g, m, sysParams.p);
};
exports.decodeMessage = function (mh, sysParams) {
    index_2.isSystemParameters(sysParams);
    mh = typeof mh === 'number' ? index_1.GlobalHelper.newBN(mh) : mh;
    var m = index_1.GlobalHelper.newBN(0);
    while (!index_1.GlobalHelper.timingSafeEqualBN(exports.encodeMessage(m, sysParams), mh)) {
        m = m.add(index_1.GlobalHelper.newBN(1));
    }
    return m;
};
exports.encrypt = function (message, sysParams, publicKey, log) {
    if (log === void 0) { log = false; }
    index_2.isSystemParameters(sysParams);
    var m = typeof message === 'number' ? index_1.GlobalHelper.newBN(message) : message;
    var r = index_1.GlobalHelper.getSecureRandomValue(sysParams.q);
    var c1 = index_1.GlobalHelper.powBN(sysParams.g, r, sysParams.p);
    var s = index_1.GlobalHelper.powBN(publicKey, r, sysParams.p);
    var mh = exports.encodeMessage(m, sysParams);
    var c2 = index_1.GlobalHelper.mulBN(s, mh, sysParams.p);
    log && console.log('enc secret   (r)', r);
    log && console.log('a\t\t', c1);
    log && console.log('h^r\t\t', s);
    log && console.log('g^m\t\t', mh);
    log && console.log('b\t\t', c2);
    log && console.log('------------------------');
    return { a: c1, b: c2, r: r };
};
exports.decrypt1 = function (cipherText, sk, sysParams, log) {
    if (log === void 0) { log = false; }
    index_2.isCipher(cipherText);
    index_2.isSystemParameters(sysParams);
    var c1 = cipherText.a, c2 = cipherText.b;
    var s = index_1.GlobalHelper.powBN(c1, sk, sysParams.p);
    var sInverse = index_1.GlobalHelper.invmBN(s, sysParams.p);
    var mh = index_1.GlobalHelper.mulBN(c2, sInverse, sysParams.p);
    var m = exports.decodeMessage(mh, sysParams);
    log && console.log('s\t\t', s);
    log && console.log('s^-1\t\t', sInverse);
    log && console.log('mh\t\t', mh);
    log && console.log('plaintext d1\t', m);
    log && console.log('------------------------');
    return m;
};
exports.decrypt2 = function (cipherText, sk, sysParams, log) {
    if (log === void 0) { log = false; }
    index_2.isCipher(cipherText);
    index_2.isSystemParameters(sysParams);
    var c1 = cipherText.a, c2 = cipherText.b;
    var s = index_1.GlobalHelper.powBN(c1, sk, sysParams.p);
    var sPowPMinus2 = index_1.GlobalHelper.powBN(s, sysParams.p.sub(index_1.GlobalHelper.newBN(2)), sysParams.p);
    var mh = index_1.GlobalHelper.mulBN(c2, sPowPMinus2, sysParams.p);
    var m = exports.decodeMessage(mh, sysParams);
    log && console.log('s\t\t', s);
    log && console.log('s^(p-2)\t\t', sPowPMinus2);
    log && console.log('mh\t', mh);
    log && console.log('plaintext d2\t', m);
    log && console.log('------------------------');
    return m;
};
exports.add = function (em1, em2, sysParams) {
    index_2.isCipher(em1);
    index_2.isCipher(em2);
    index_2.isSystemParameters(sysParams);
    return {
        a: index_1.GlobalHelper.mulBN(em1.a, em2.a, sysParams.p),
        b: index_1.GlobalHelper.mulBN(em1.b, em2.b, sysParams.p),
    };
};
exports.decryptShare = function (params, cipher, secretKeyShare) {
    index_2.isSystemParameters(params);
    index_2.isCipher(cipher);
    return index_1.GlobalHelper.powBN(cipher.a, secretKeyShare, params.p);
};
exports.combineDecryptedShares = function (params, cipher, decryptedShares) {
    index_2.isSystemParameters(params);
    index_2.isCipher(cipher);
    var mh = index_1.GlobalHelper.divBN(cipher.b, decryptedShares.reduce(function (product, share) { return index_1.GlobalHelper.mulBN(product, share, params.p); }), params.p);
    return exports.decodeMessage(mh, params);
};
