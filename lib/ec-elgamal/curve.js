"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.curve = exports.curveDefinition = void 0;
var EC = require('elliptic').ec;
var curve25519 = new EC('alt_bn128');
exports.curveDefinition = curve25519;
exports.curve = exports.curveDefinition.curve;
