"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCipher = exports.isKeyPair = exports.isSystemParameters = void 0;
var BN = require("bn.js");
function isSystemParameters(object) {
    var check1 = object.p !== undefined && object.p instanceof BN;
    var check2 = object.q !== undefined && object.q instanceof BN;
    var check3 = object.g !== undefined && object.g instanceof BN;
    if (!(check1 && check2 && check3)) {
        throw new TypeError("The provided input for type: SystemParameters is not of the required type. Given: " + JSON.stringify(object) + ", Required: {p: BN, q: BN, g: BN}");
    }
    return check1 && check2 && check3;
}
exports.isSystemParameters = isSystemParameters;
function isKeyPair(object) {
    var check1 = object.h !== undefined && object.h instanceof BN;
    var check2 = object.sk !== undefined && object.sk instanceof BN;
    if (!(check1 && check2)) {
        throw new TypeError("The provided input for type: KeyPair is not of the required type. Given: " + JSON.stringify(object) + ", Required: {h: BN, sk: BN}");
    }
    return check1 && check2;
}
exports.isKeyPair = isKeyPair;
function isCipher(object) {
    var check1 = object.a !== undefined && object.a instanceof BN;
    var check2 = object.b !== undefined && object.b instanceof BN;
    var rPresent = object.r !== undefined;
    var check3 = rPresent ? object.r instanceof BN : true;
    if (!(check1 && check2)) {
        throw new TypeError("The provided input for type: Cipher is not of the required type. Given: " + JSON.stringify(object) + ", Required: {a: BN, b: BN}");
    }
    else if (rPresent && !check3) {
        throw new TypeError("The provided input for type: Cipher is not of the required type. Given: " + JSON.stringify(object) + ", Required: {a: BN, b: BN, r?: BN}");
    }
    return check1 && check2 && check3;
}
exports.isCipher = isCipher;
