"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.combineDecryptedShares = exports.decryptShare = exports.homomorphicAdd = exports.decrypt = exports.encrypt = void 0;
var index_1 = require("../index");
var index_2 = require("./index");
exports.encrypt = function (message, publicKey, log) {
    if (log === void 0) { log = false; }
    var r = index_1.GlobalHelper.getSecureRandomValue(index_2.Curve.n);
    var c1 = index_2.Curve.g.mul(r);
    var s = publicKey.mul(r);
    var c2 = s.add(message);
    log && console.log('Is c1 on the curve?\t', index_2.Curve.validate(c1));
    log && console.log('Is point s on the curve?', index_2.Curve.validate(s));
    log && console.log('Is c2 on curve?\t\t', index_2.Curve.validate(c2));
    return { a: c1, b: c2, r: r };
};
exports.decrypt = function (cipherText, privateKey, log) {
    if (log === void 0) { log = false; }
    var c1 = cipherText.a, c2 = cipherText.b;
    var s = c1.mul(privateKey);
    var sInverse = s.neg();
    var m = c2.add(sInverse);
    log && console.log('is s on the curve?', index_2.Curve.validate(s));
    log && console.log('is s^-1 on the curve?', index_2.Curve.validate(sInverse));
    log && console.log('is m on curve?', index_2.Curve.validate(m));
    return m;
};
exports.homomorphicAdd = function (cipher0, cipher1) {
    return {
        a: cipher0.a.add(cipher1.a),
        b: cipher0.b.add(cipher1.b),
    };
};
exports.decryptShare = function (cipher, secretKeyShare) {
    return index_2.Helper.ECpow(cipher.a, secretKeyShare);
};
exports.combineDecryptedShares = function (cipher, decryptedShares) {
    var mh = index_2.Helper.ECdiv(cipher.b, decryptedShares.reduce(function (product, share) { return index_2.Helper.ECmul(product, share); }));
    return mh;
};
