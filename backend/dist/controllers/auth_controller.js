"use strict";
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.verifyEmail = exports.registerUser = void 0;
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var User_1 = __importDefault(require("../models/User"));
var dotenv_1 = __importDefault(require("dotenv"));
var user_controller_1 = require("./user_controller");
dotenv_1.default.config();
var registerUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, location, password, user, hashedPassword, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, email = _a.email, location = _a.location, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                return [4 /*yield*/, User_1.default.findOne({ email: email })];
            case 2:
                user = _b.sent();
                if (user) {
                    return [2 /*return*/, res.status(400).json({ code: 400, message: 'User already exists' })];
                }
                return [4 /*yield*/, (0, user_controller_1.hashPassword)(password, 10)];
            case 3:
                hashedPassword = (_b.sent()).hashedPassword;
                user = new User_1.default({ name: name, email: email, location: location, isEmailVerified: true, password: hashedPassword });
                return [4 /*yield*/, user.save()];
            case 4:
                _b.sent();
                // const emailVerificationToken = jwt.sign({ email }, process.env.JWT_SECRET || '', {
                //   expiresIn: '1h',
                // });
                // try {
                //   sendEmail(email, `http://localhost:3000/account/verify?token=${emailVerificationToken}`)
                // } catch (error) {
                //   console.log(error)
                // }
                res.status(200).json({
                    code: 200,
                    message: 'Registration successful. Please login'
                });
                return [3 /*break*/, 6];
            case 5:
                err_1 = _b.sent();
                next(err_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.registerUser = registerUser;
var verifyEmail = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var token, decodedToken, email, user, payload, authToken, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                token = req.query.token;
                decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
                email = decodedToken.email;
                // const email = ''
                console.log(email);
                return [4 /*yield*/, User_1.default.findOne({ email: email })];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(500).json({ code: 500, message: 'Invalid verification token' })];
                }
                if (user.isEmailVerified == true) {
                    return [2 /*return*/, res.status(400).json({ code: 400, message: 'Account already verified' })];
                }
                user.isEmailVerified = true;
                return [4 /*yield*/, user.save()];
            case 2:
                _a.sent();
                payload = { user: { id: user._id } };
                authToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });
                res.status(200).json({ code: 200, message: 'Success', payload: authToken });
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                next(err_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.verifyEmail = verifyEmail;
var loginUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, isMatch, payload, token, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                console.log("Signing in user");
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, User_1.default.findOne({ email: email })];
            case 2:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res.status(401).json({ code: 401, message: 'Invalid credentials' })];
                }
                if (!user.isEmailVerified) {
                    return [2 /*return*/, res.status(401).json({ code: 401, message: 'Email not verified' })];
                }
                return [4 /*yield*/, bcryptjs_1.default.compare(password, user.password)];
            case 3:
                isMatch = _b.sent();
                if (!isMatch) {
                    return [2 /*return*/, res.status(401).json({ code: 401, message: 'Invalid credentials' })];
                }
                payload = { user: { id: user._id } };
                token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET);
                res.status(200).json({
                    code: 200, message: 'Success', payload: {
                        token: token,
                        location: user.location
                    }
                });
                return [3 /*break*/, 5];
            case 4:
                err_3 = _b.sent();
                next(err_3);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.loginUser = loginUser;
