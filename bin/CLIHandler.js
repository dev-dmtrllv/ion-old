"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stop = exports.ask = exports.getCliMethod = exports.cliHandler = exports.cliHandlers = void 0;
var readline_1 = __importDefault(require("readline"));
var readLine = readline_1.default.createInterface(process.stdin, process.stdout);
exports.cliHandlers = {};
var cliHandler = function (command, description, method) { return exports.cliHandlers[command] = { description: description, method: method }; };
exports.cliHandler = cliHandler;
var getCliMethod = function (command) {
    for (var key in exports.cliHandlers) {
        if (command == key || command == key[0] || command == "-" + key[0])
            return exports.cliHandlers[key];
    }
    return null;
};
exports.getCliMethod = getCliMethod;
var ask = function (question, defaultVal) {
    if (defaultVal === void 0) { defaultVal = ""; }
    return new Promise(function (res) { return readLine.question(question + ": " + ((!!defaultVal) ? "[" + defaultVal + "] " : ""), function (answer) { return res((!!answer) ? answer : defaultVal); }); });
};
exports.ask = ask;
var stop = function () { return readLine.close(); };
exports.stop = stop;
