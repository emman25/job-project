"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
var generateToken = function () {
    var digits = "0123456789";
    var token = "";
    for (var i = 0; i < 6; i++) {
        token += digits[Math.floor(Math.random() * 10)];
    }
    return token;
};
exports.generateToken = generateToken;
