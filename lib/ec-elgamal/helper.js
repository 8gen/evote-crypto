"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializeParams = exports.serializeSystemParameters = exports.deserializeCurvePoint = exports.serializeCurvePoint = exports.deserializeBN = exports.serializeBN = exports.curvePointsToString = exports.curvePointToString = exports.ECdiv = exports.ECmul = exports.ECpow = void 0;
var BN = require("bn.js");
var index_1 = require("./index");
var models_1 = require("./models");
exports.ECpow = function (a, b) { return a.mul(b); };
exports.ECmul = function (a, b) { return a.add(b); };
exports.ECdiv = function (a, b) { return a.add(b.neg()); };
exports.curvePointToString = function (point) {
    var pointAsJSON = point.toJSON();
    var Px = pointAsJSON[0].toString('hex');
    var Py = pointAsJSON[1].toString('hex');
    return Px + Py;
};
exports.curvePointsToString = function (points) {
    var asString = '';
    for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
        var point = points_1[_i];
        asString += exports.curvePointToString(point);
    }
    return asString;
};
exports.serializeBN = function (bn) {
    return bn.toString('hex');
};
exports.deserializeBN = function (bn) {
    return new BN(bn, 'hex');
};
exports.serializeCurvePoint = function (point) {
    return point.encode('hex', false);
};
exports.deserializeCurvePoint = function (point) {
    if (typeof point !== 'string') {
        return point;
    }
    return index_1.Curve.decodePoint(point, 'hex');
};
exports.serializeSystemParameters = function (params) {
    return {
        p: exports.serializeBN(params.p),
        n: exports.serializeBN(params.n),
        g: exports.serializeCurvePoint(params.g),
    };
};
exports.deserializeParams = function (params) {
    if (!models_1.instanceOfSystemParametersSerialized(params)) {
        return params;
    }
    return {
        p: exports.deserializeBN(params.p),
        n: exports.deserializeBN(params.n),
        g: exports.deserializeCurvePoint(params.g),
    };
};
