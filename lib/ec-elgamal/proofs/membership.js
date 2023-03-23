"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.generateNoProof = exports.generateYesProof = exports.generateChallenge = void 0;
var BN = require("bn.js");
var index_1 = require("../../index");
var index_2 = require("../index");
var curve_1 = require("../curve");
var printConsole = false;
exports.generateChallenge = function (n, id, c1, c2, a1, a2, b1, b2) {
    var pointsAsString = index_2.Helper.curvePointsToString([c1, c2, a1, a2, b1, b2]);
    var input = id + pointsAsString;
    var c = curve_1.curveDefinition
        .hash()
        .update(input)
        .digest('hex');
    c = new BN(c, 'hex');
    c = c.mod(n);
    return c;
};
exports.generateYesProof = function (encryptedVote, params, publicKey, id) {
    var a = encryptedVote.a, b = encryptedVote.b, r = encryptedVote.r;
    var _a = index_2.Helper.deserializeParams(params), g = _a.g, n = _a.n;
    var h = index_2.Helper.deserializeCurvePoint(publicKey);
    if (r === undefined || r === null) {
        throw new Error('value r is undefined');
    }
    var c0 = index_1.GlobalHelper.getSecureRandomValue(n);
    var f0 = index_1.GlobalHelper.getSecureRandomValue(n);
    var a0 = index_2.Helper.ECdiv(index_2.Helper.ECpow(g, f0), index_2.Helper.ECpow(a, c0));
    var b0 = index_2.Helper.ECdiv(index_2.Helper.ECpow(h, f0), index_2.Helper.ECpow(b, c0));
    var x = index_1.GlobalHelper.getSecureRandomValue(n);
    var a1 = index_2.Helper.ECpow(g, x);
    var b1 = index_2.Helper.ECpow(h, x);
    var c = exports.generateChallenge(n, id, a, b, a0, b0, a1, b1);
    var c1 = index_1.GlobalHelper.addBN(n, index_1.GlobalHelper.subBN(c, c0, n), n);
    var f1 = index_1.GlobalHelper.addBN(x, index_1.GlobalHelper.mulBN(c1, r, n), n);
    printConsole && console.log('a0 is on the curve?\t', index_2.Curve.validate(a0));
    printConsole && console.log('b0 is on the curve?\t', index_2.Curve.validate(b0));
    printConsole && console.log('a1 is on the curve?\t', index_2.Curve.validate(a1));
    printConsole && console.log('b1 is on the curve?\t', index_2.Curve.validate(b1));
    printConsole && console.log('c0\t\t\t\t', c0.toString('hex'));
    printConsole && console.log('f0\t\t\t\t', f0.toString('hex'));
    printConsole && console.log('x\t\t\t\t', x.toString('hex'));
    printConsole && console.log('c\t\t\t\t', c.toString('hex'));
    printConsole && console.log('c1 = (q + (c - c0) % q) % q\t', c1.toString('hex'));
    printConsole && console.log('f1 = x + c1*r\t\t\t', f1.toString('hex'));
    printConsole && console.log();
    return { a0: a0, a1: a1, b0: b0, b1: b1, c0: c0, c1: c1, f0: f0, f1: f1 };
};
exports.generateNoProof = function (encryptedVote, params, publicKey, id) {
    var a = encryptedVote.a, b = encryptedVote.b, r = encryptedVote.r;
    var _a = index_2.Helper.deserializeParams(params), g = _a.g, n = _a.n;
    var h = index_2.Helper.deserializeCurvePoint(publicKey);
    if (r === undefined || r === null) {
        throw new Error('value r is undefined');
    }
    var c1 = index_1.GlobalHelper.getSecureRandomValue(n);
    var f1 = index_1.GlobalHelper.getSecureRandomValue(n);
    var b_ = index_2.Helper.ECdiv(b, g);
    var a1 = index_2.Helper.ECdiv(index_2.Helper.ECpow(g, f1), index_2.Helper.ECpow(a, c1));
    var b1 = index_2.Helper.ECdiv(index_2.Helper.ECpow(h, f1), index_2.Helper.ECpow(b_, c1));
    var x = index_1.GlobalHelper.getSecureRandomValue(n);
    var a0 = index_2.Helper.ECpow(g, x);
    var b0 = index_2.Helper.ECpow(h, x);
    var c = exports.generateChallenge(n, id, a, b, a0, b0, a1, b1);
    var c0 = index_1.GlobalHelper.addBN(n, index_1.GlobalHelper.subBN(c, c1, n), n);
    var f0 = index_1.GlobalHelper.addBN(x, index_1.GlobalHelper.mulBN(c0, r, n), n);
    printConsole && console.log('a1 is on the curve?\t', index_2.Curve.validate(a1));
    printConsole && console.log('b1 is on the curve?\t', index_2.Curve.validate(b1));
    printConsole && console.log('a0 is on the curve?\t', index_2.Curve.validate(a0));
    printConsole && console.log('b0 is on the curve?\t', index_2.Curve.validate(b0));
    printConsole && console.log('c1\t\t\t\t', c1.toString('hex'));
    printConsole && console.log('f1\t\t\t\t', f1.toString('hex'));
    printConsole && console.log('x\t\t\t\t', x.toString('hex'));
    printConsole && console.log('c\t\t\t\t', c.toString('hex'));
    printConsole && console.log('c0 = (q + (c - c1) % q) % q\t', c0.toString('hex'));
    printConsole && console.log('f0 = x + c0*r\t\t\t', f0.toString('hex'));
    printConsole && console.log();
    return { a0: a0, a1: a1, b0: b0, b1: b1, c0: c0, c1: c1, f0: f0, f1: f1 };
};
exports.verify = function (encryptedVote, proof, params, publicKey, id) {
    var a0 = proof.a0, a1 = proof.a1, b0 = proof.b0, b1 = proof.b1, c0 = proof.c0, c1 = proof.c1, f0 = proof.f0, f1 = proof.f1;
    var _a = index_2.Helper.deserializeParams(params), g = _a.g, n = _a.n;
    var h = index_2.Helper.deserializeCurvePoint(publicKey);
    var a = encryptedVote.a, b = encryptedVote.b;
    var v1 = index_2.Helper.ECpow(g, f0).eq(index_2.Helper.ECmul(a0, index_2.Helper.ECpow(a, c0)));
    var v2 = index_2.Helper.ECpow(g, f1).eq(index_2.Helper.ECmul(a1, index_2.Helper.ECpow(a, c1)));
    var v3 = index_2.Helper.ECpow(h, f0).eq(index_2.Helper.ECmul(b0, index_2.Helper.ECpow(b, c0)));
    var v4 = index_2.Helper.ECpow(h, f1).eq(index_2.Helper.ECmul(b1, index_2.Helper.ECpow(index_2.Helper.ECdiv(b, g), c1)));
    var v5 = index_1.GlobalHelper.addBN(c0, c1, n).eq(exports.generateChallenge(n, id, a, b, a0, b0, a1, b1));
    printConsole && console.log('g^f0 == a0*a^c0:\t', v1);
    printConsole && console.log('g^f1 == a1*a^c1\t\t', v2);
    printConsole && console.log('h^f0 == b0*b^c0\t\t', v3);
    printConsole && console.log('h^f1 == b1*(b/g)^c1\t', v4);
    printConsole && console.log('c == c1 + c0\t\t', v5);
    printConsole && console.log();
    return v1 && v2 && v3 && v4 && v5;
};
