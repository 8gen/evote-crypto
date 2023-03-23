"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instanceOfSystemParametersSerialized = void 0;
exports.instanceOfSystemParametersSerialized = function (object) {
    return ('p' in object &&
        typeof object.p === 'string' &&
        'n' in object &&
        typeof object.n === 'string' &&
        'g' in object &&
        typeof object.g === 'string');
};
