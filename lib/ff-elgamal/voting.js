"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSummary = exports.tallyVotes = exports.addVotes = exports.generateBaseVote = exports.generateNoVote = exports.generateYesVote = void 0;
var index_1 = require("../index");
var index_2 = require("./index");
exports.generateYesVote = function (sp, pk) {
    return index_2.Encryption.encrypt(1, sp, pk);
};
exports.generateNoVote = function (sp, pk) {
    return index_2.Encryption.encrypt(0, sp, pk);
};
exports.generateBaseVote = function () {
    return { a: index_1.GlobalHelper.newBN(1), b: index_1.GlobalHelper.newBN(1) };
};
exports.addVotes = function (votes, sp) {
    return votes.reduce(function (previous, current) { return index_2.Encryption.add(previous, current, sp); }, exports.generateBaseVote());
};
exports.tallyVotes = function (sp, sk, votes) {
    return index_2.Encryption.decrypt1(exports.addVotes(votes, sp), sk, sp).toNumber();
};
exports.getSummary = function (total, tallyResult) {
    var yes = tallyResult - 0;
    var no = total - yes;
    return { total: total, yes: yes, no: no };
};
