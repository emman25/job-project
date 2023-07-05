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
exports.getCV = exports.uploadCV = exports.unsaveJob = exports.saveJob = exports.getSavedJobs = exports.deleteUser = exports.updateUser = exports.getUserById = void 0;
var User_1 = __importDefault(require("../models/User"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var path_1 = __importDefault(require("path"));
var hashPassword = function (password, saltRounds) { return __awaiter(void 0, void 0, void 0, function () {
    var salt, hashedPassword;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, bcryptjs_1.default.genSalt(saltRounds)];
            case 1:
                salt = _a.sent();
                return [4 /*yield*/, bcryptjs_1.default.hash(password, salt)];
            case 2:
                hashedPassword = _a.sent();
                return [2 /*return*/, { salt: salt, hashedPassword: hashedPassword }];
        }
    });
}); };
var getUserById = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.user.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, User_1.default.findById(userId)];
            case 2:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({ message: 'User not found' })];
                }
                res.status(200).json({ code: 200, message: 'Success', payload: user });
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                next(err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getUserById = getUserById;
var updateUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, _a, name, email, password, user, hashedPassword, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                userId = req.user.id;
                _a = req.body, name = _a.name, email = _a.email, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                return [4 /*yield*/, User_1.default.findById(userId)];
            case 2:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({ message: 'User not found' })];
                }
                if (name)
                    user.name = name;
                if (email)
                    user.email = email;
                if (!password) return [3 /*break*/, 4];
                return [4 /*yield*/, hashPassword(password, 10)];
            case 3:
                hashedPassword = (_b.sent()).hashedPassword;
                user.password = hashedPassword;
                _b.label = 4;
            case 4:
                ;
                return [4 /*yield*/, user.save()];
            case 5:
                _b.sent();
                res.status(200).json({
                    code: 200,
                    message: 'Successfully updated user'
                });
                return [3 /*break*/, 7];
            case 6:
                err_2 = _b.sent();
                next(err_2);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.updateUser = updateUser;
var deleteUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.user.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, User_1.default.findByIdAndDelete(userId)];
            case 2:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({ message: 'User not found' })];
                }
                res.json({ message: 'User deleted' });
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                next(err_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteUser = deleteUser;
var getSavedJobs = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user, savedJobs, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.user.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, User_1.default.findById(userId).populate('savedJobs').sort({ createdAt: 1 })];
            case 2:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({ message: 'User not found' })];
                }
                savedJobs = user.savedJobs;
                res.status(200).json({
                    code: 200,
                    message: 'Success',
                    payload: savedJobs
                });
                return [3 /*break*/, 4];
            case 3:
                err_4 = _a.sent();
                next(err_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getSavedJobs = getSavedJobs;
var saveJob = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, jobId, user, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.user.id;
                jobId = req.params.jobId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, User_1.default.findById(userId)];
            case 2:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({ message: 'User not found' })];
                }
                if (user.savedJobs.includes(jobId)) {
                    return [2 /*return*/, res.status(400).json({ message: 'Job already saved' })];
                }
                user.savedJobs.push(jobId);
                return [4 /*yield*/, user.save()];
            case 3:
                _a.sent();
                res.status(200).json({ code: 200, message: 'Success' });
                return [3 /*break*/, 5];
            case 4:
                err_5 = _a.sent();
                next(err_5);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.saveJob = saveJob;
var unsaveJob = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, jobId, user, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.user.id;
                jobId = req.params.jobId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, User_1.default.findById(userId)];
            case 2:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({ message: 'User not found' })];
                }
                user.savedJobs = user.savedJobs.filter(function (savedJobId) { return savedJobId._id.toString() !== jobId; });
                return [4 /*yield*/, user.save()];
            case 3:
                _a.sent();
                res.status(200).json({ code: 200, message: 'Success' });
                return [3 /*break*/, 5];
            case 4:
                err_6 = _a.sent();
                next(err_6);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.unsaveJob = unsaveJob;
var uploadCV = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, originalname, user, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                userId = req.user.id;
                originalname = req.file.originalname;
                if (!originalname) {
                    return [2 /*return*/, res.status(500).json({ code: 500, message: 'CV file is required' })];
                }
                return [4 /*yield*/, User_1.default.findById(userId)];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(500).json({ code: 500, error: 'User not found' })];
                }
                user.cv = originalname;
                return [4 /*yield*/, user.save()];
            case 2:
                _a.sent();
                res.status(200).json({ code: 200, message: 'CV uploaded successfully' });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                next(error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.uploadCV = uploadCV;
var getCV = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user, uploadDirectory, filename, filePath, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.user.id;
                return [4 /*yield*/, User_1.default.findById(userId)];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(500).json({ code: 500, error: 'User not found' })];
                }
                uploadDirectory = 'uploads';
                filename = user.cv;
                filePath = path_1.default.join(uploadDirectory, filename);
                res.download(filePath, function (err) {
                    if (err) {
                        // Handle the error, such as sending an appropriate response
                        res.status(404).send('File not found');
                    }
                });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                next(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getCV = getCV;
