"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CLIHandler_1 = require("./CLIHandler");
exports.default = CLIHandler_1.cliHandler("help", "Shows this dialog.", function (cwd) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    for (var cmd in CLIHandler_1.cliHandlers)
        console.log("[ " + cmd + " | " + cmd[0] + " | -" + cmd[0] + " ]\t" + CLIHandler_1.cliHandlers[cmd].description);
});
