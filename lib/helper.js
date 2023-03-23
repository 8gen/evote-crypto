"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timingSafeEqualBN = exports.timingSafeEqual = exports.getSecureRandomValue = exports.getByteSizeForDecimalNumber = exports.powBN = exports.divBN = exports.mulBN = exports.subBN = exports.addBN = exports.invmBN = exports.newBN = void 0;
var BN = require("bn.js");
var crypto = require("crypto");
exports.newBN = function (n, base) {
    if (base === void 0) { base = 10; }
    return new BN(n, base);
};
exports.invmBN = function (a, modulus) { return a.invm(modulus); };
exports.addBN = function (a, b, modulus) { return a.add(b).mod(modulus); };
exports.subBN = function (a, b, modulus) { return a.sub(b).mod(modulus); };
exports.mulBN = function (a, b, modulus) { return a.mul(b).mod(modulus); };
exports.divBN = function (a, b, modulus) { return exports.mulBN(a, exports.invmBN(b, modulus), modulus); };
exports.powBN = function (a, b, modulus) { return a.pow(b).mod(modulus); };
exports.getByteSizeForDecimalNumber = function (n) {
    var modulus = n.mod(new BN(256, 10));
    var smallerHalf = modulus.lt(new BN(128, 10));
    var result = n.divRound(new BN(256, 10));
    return smallerHalf ? result.add(new BN(1, 10)) : result;
};
exports.getSecureRandomValue = function (n) {
    var ONE = new BN(1, 10);
    var UPPER_BOUND_RANDOM = n.sub(ONE);
    var BYTE_SIZE = exports.getByteSizeForDecimalNumber(n);
    var byteSize;
    try {
        byteSize = BYTE_SIZE.toNumber();
    }
    catch (_a) {
        byteSize = 32;
    }
    var randomBytes = crypto.randomBytes(byteSize);
    var randomValue = new BN(randomBytes);
    while (!(randomValue.lte(UPPER_BOUND_RANDOM) && randomValue.gte(ONE))) {
        randomBytes = crypto.randomBytes(byteSize);
        randomValue = new BN(randomBytes);
    }
    return randomValue;
};
exports.timingSafeEqual = function (a, b) {
    if (!Buffer.isBuffer(a)) {
        throw new TypeError('First argument must be a buffer');
    }
    if (!Buffer.isBuffer(b)) {
        throw new TypeError('Second argument must be a buffer');
    }
    var mismatch = a.length === b.length ? 0 : 1;
    if (mismatch) {
        b = a;
    }
    for (var i = 0, len = a.length; i < len; i++) {
        mismatch |= a[i] ^ b[i];
    }
    return mismatch === 0;
};
exports.timingSafeEqualBN = function (a, b) {
    if (!BN.isBN(a)) {
        throw new TypeError('First argument must be of type: BN');
    }
    if (!BN.isBN(b)) {
        throw new TypeError('Second argument must be of type: BN');
    }
    var a_ = new Buffer(a.toArray());
    var b_ = new Buffer(b.toArray());
    return exports.timingSafeEqual(a_, b_);
};
