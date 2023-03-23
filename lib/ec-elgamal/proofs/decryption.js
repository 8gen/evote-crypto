"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.generate = exports.generateChallenge = void 0;
var BN = require("bn.js");
var index_1 = require("../../index");
var index_2 = require("../index");
var curve_1 = require("../curve");
exports.generateChallenge = function (n, id, a, b, a1, b1) {
    var pointsAsString = index_2.Helper.curvePointsToString([a, b, a1, b1]);
    var input = id + pointsAsString;
    var c = curve_1.curveDefinition
        .hash()
        .update(input)
        .digest('hex');
    c = new BN(c, 'hex');
    c = c.mod(n);
    return c;
};
exports.generate = function (cipher, params, sk, id, log) {
    if (log === void 0) { log = false; }
    var a = cipher.a, b = cipher.b;
    var _a = index_2.Helper.deserializeParams(params), g = _a.g, n = _a.n;
    var x = index_1.GlobalHelper.getSecureRandomValue(n);
    var a1 = index_2.Helper.ECpow(a, x);
    var b1 = index_2.Helper.ECpow(g, x);
    var c = exports.generateChallenge(n, id, a, b, a1, b1);
    var f = index_1.GlobalHelper.addBN(x, index_1.GlobalHelper.mulBN(c, sk, n), n);
    var d = index_2.Helper.ECpow(a, sk);
    log && console.log('a1 is on the curve?\t', index_2.Curve.validate(a1));
    log && console.log('b1 is on the curve?\t', index_2.Curve.validate(b1));
    log && console.log('d is on the curve?\t', index_2.Curve.validate(d));
    log && console.log('x\t\t\t', x);
    log && console.log('a1\t\t\t', a1);
    log && console.log('b1\t\t\t', b1);
    log && console.log('c\t\t\t', c);
    log && console.log('f = x + c*r\t\t', f);
    log && console.log();
    return { a1: a1, b1: b1, f: f, d: d };
};
exports.verify = function (encryptedSum, proof, params, pk, id, log) {
    if (log === void 0) { log = false; }
    var a = encryptedSum.a, b = encryptedSum.b;
    var _a = index_2.Helper.deserializeParams(params), g = _a.g, n = _a.n;
    pk = index_2.Helper.deserializeCurvePoint(pk);
    var a1 = proof.a1, b1 = proof.b1, f = proof.f, d = proof.d;
    var c = exports.generateChallenge(n, id, a, b, a1, b1);
    var l1 = index_2.Helper.ECpow(a, f);
    var r1 = index_2.Helper.ECmul(a1, index_2.Helper.ECpow(d, c));
    var v1 = l1.eq(r1);
    var l2 = index_2.Helper.ECpow(g, f);
    var r2 = index_2.Helper.ECmul(b1, index_2.Helper.ECpow(pk, c));
    var v2 = l2.eq(r2);
    log && console.log('a^f == a1*d^c:\t\t', v1);
    log && console.log('g^f == b1*h^c\t\t', v2);
    log && console.log();
    return v1 && v2;
};
