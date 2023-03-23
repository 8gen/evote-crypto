"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSummary = exports.tallyVotes = exports.findPoint = exports.addVotes = exports.generateBaseVote = exports.generateNoVote = exports.generateYesVote = exports.noVote = exports.yesVote = void 0;
var index_1 = require("./index");
exports.yesVote = index_1.Curve.g;
exports.noVote = index_1.Curve.point(null, null);
exports.generateYesVote = function (pk) {
    return index_1.Encryption.encrypt(exports.yesVote, index_1.Helper.deserializeCurvePoint(pk));
};
exports.generateNoVote = function (pk) {
    return index_1.Encryption.encrypt(exports.noVote, index_1.Helper.deserializeCurvePoint(pk));
};
exports.generateBaseVote = function (pk) {
    return { a: index_1.Curve.g, b: index_1.Helper.deserializeCurvePoint(pk) };
};
exports.addVotes = function (votes, pk) {
    return votes.reduce(function (previous, current) { return index_1.Encryption.homomorphicAdd(previous, current); }, exports.generateBaseVote(pk));
};
exports.findPoint = function (point) {
    var sumPoint = exports.noVote;
    var counter = 0;
    while (!point.eq(sumPoint)) {
        sumPoint = sumPoint.add(exports.yesVote);
        counter += 1;
    }
    return counter;
};
exports.tallyVotes = function (pk, sk, votes) {
    var publicKey = index_1.Helper.deserializeCurvePoint(pk);
    var sum = index_1.Encryption.decrypt(exports.addVotes(votes, publicKey), sk);
    return exports.findPoint(sum);
};
exports.getSummary = function (total, tallyResult) {
    var yes = tallyResult - 0;
    var no = total - yes;
    return { total: total, yes: yes, no: no };
};
