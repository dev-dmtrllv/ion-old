"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var CLIHandler_1 = require("./CLIHandler");
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var child_process_1 = require("child_process");
var os_1 = require("os");
var run = function (cwd, cmd) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    return child_process_1.spawnSync((os_1.platform() === "win32" ? cmd + ".cmd" : cmd), args, { cwd: cwd, stdio: "inherit" });
};
exports.default = CLIHandler_1.cliHandler("new", "Creates a new project.", function (cwd) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return __awaiter(void 0, void 0, void 0, function () {
        var ignoreCheck, config, _a, override, _b, _c, _d, _;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    ignoreCheck = args.includes("-y");
                    config = {
                        name: "",
                        path: cwd,
                        host: "localhost",
                        port: 80
                    };
                    if (!ignoreCheck) return [3 /*break*/, 1];
                    args.splice(args.indexOf("-y"), 1);
                    config.name = args[0] || path_1.default.basename(cwd);
                    config.path = config.name == path_1.default.basename(cwd) ? cwd : path_1.default.resolve(cwd, config.name);
                    return [3 /*break*/, 9];
                case 1:
                    if (!(config.name.length == 0)) return [3 /*break*/, 3];
                    _a = config;
                    return [4 /*yield*/, CLIHandler_1.ask("name", args[0] || path_1.default.basename(cwd))];
                case 2:
                    _a.name = _e.sent();
                    return [3 /*break*/, 1];
                case 3:
                    if (!fs_1.default.existsSync(config.path)) return [3 /*break*/, 5];
                    return [4 /*yield*/, CLIHandler_1.ask("The folder " + config.path + " already exists! Do you want to reinstall? Y/n", "n")];
                case 4:
                    override = _e.sent();
                    if (override.toLowerCase() != "y")
                        process.exit();
                    return [3 /*break*/, 6];
                case 5:
                    fs_1.default.mkdirSync(config.path, { recursive: true });
                    _e.label = 6;
                case 6:
                    config.path = config.name == path_1.default.basename(cwd) ? cwd : path_1.default.resolve(cwd, config.name);
                    _b = config;
                    return [4 /*yield*/, CLIHandler_1.ask("host", "localhost")];
                case 7:
                    _b.host = _e.sent();
                    _c = config;
                    _d = Number;
                    return [4 /*yield*/, CLIHandler_1.ask("port", "80")];
                case 8:
                    _c.port = _d.apply(void 0, [_e.sent()]);
                    _e.label = 9;
                case 9:
                    _ = function () {
                        var p = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            p[_i] = arguments[_i];
                        }
                        return path_1.default.resolve.apply(path_1.default, __spreadArray([config.path], p));
                    };
                    fs_1.default.writeFileSync(_("package.json"), JSON.stringify({
                        name: config.name,
                        version: "0.1.0",
                        scripts: {
                            start: "ion watch",
                            build: "ion build",
                            serve: "ion run"
                        },
                        dependencies: __assign(__assign({}, (require("../package.json").dependencies)), { "ion": "github:dev-dmtrllv/ion" }),
                        license: "ISC"
                    }), "utf-8");
                    run(config.path, "npm", "install");
                    return [2 /*return*/];
            }
        });
    });
});
