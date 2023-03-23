"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSystemParameters = exports.isKeyPair = exports.isCipher = exports.Voting = exports.SystemSetup = exports.Proof = exports.Helper = exports.Encryption = void 0;
var Encryption = __importStar(require("./encryption"));
exports.Encryption = Encryption;
var Helper = __importStar(require("./helper"));
exports.Helper = Helper;
var Proof = __importStar(require("./proofs"));
exports.Proof = Proof;
var SystemSetup = __importStar(require("./systemSetup"));
exports.SystemSetup = SystemSetup;
var Voting = __importStar(require("./voting"));
exports.Voting = Voting;
var models_1 = require("./models");
Object.defineProperty(exports, "isCipher", { enumerable: true, get: function () { return models_1.isCipher; } });
Object.defineProperty(exports, "isKeyPair", { enumerable: true, get: function () { return models_1.isKeyPair; } });
Object.defineProperty(exports, "isSystemParameters", { enumerable: true, get: function () { return models_1.isSystemParameters; } });
