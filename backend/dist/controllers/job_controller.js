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
exports.deleteJob = exports.updateJob = exports.createJob = exports.getAllJobs = exports.getJobsById = void 0;
var Job_1 = __importDefault(require("../models/Job"));
var WorkType_1 = __importDefault(require("../models/WorkType"));
var Location_1 = __importDefault(require("../models/Location"));
var Tag_1 = __importDefault(require("../models/Tag"));
var getJobsById = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var jobId, job, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                jobId = req.params.id;
                return [4 /*yield*/, Job_1.default.findById(jobId).populate('workType location tags').sort({ createdAt: 1 })];
            case 1:
                job = _a.sent();
                if (!job) {
                    return [2 /*return*/, res.status(404).json({ code: 404, message: 'Not found' })];
                }
                res.status(200).json({
                    code: 200,
                    message: 'Success',
                    payload: job
                });
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                next(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getJobsById = getJobsById;
var getAllJobs = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var jobId, _a, workType, tag, location, filter, workTypeObjectId, locationObjectId, tagObjectId, jobs, job, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 11, , 12]);
                jobId = req.query.id;
                if (!(jobId == undefined)) return [3 /*break*/, 8];
                _a = req.query, workType = _a.workType, tag = _a.tag, location = _a.location;
                filter = {};
                if (!(workType && workType.trim().length > 0)) return [3 /*break*/, 2];
                return [4 /*yield*/, WorkType_1.default.find({ name: workType })];
            case 1:
                workTypeObjectId = _b.sent();
                filter.workType = workTypeObjectId;
                _b.label = 2;
            case 2:
                if (!(location && location.trim().length > 0)) return [3 /*break*/, 4];
                return [4 /*yield*/, Location_1.default.find({ name: location })];
            case 3:
                locationObjectId = _b.sent();
                console.log(locationObjectId);
                filter.location = locationObjectId;
                _b.label = 4;
            case 4:
                if (!(tag && tag.trim.length > 0)) return [3 /*break*/, 6];
                return [4 /*yield*/, Tag_1.default.find({ name: '' })];
            case 5:
                tagObjectId = _b.sent();
                filter.tags = tagObjectId;
                _b.label = 6;
            case 6:
                console.log(filter);
                return [4 /*yield*/, Job_1.default.find(filter).populate('workType location tags').sort({ createdAt: 1 })];
            case 7:
                jobs = _b.sent();
                res.status(200).json({
                    code: 200,
                    message: 'Success',
                    payload: jobs
                });
                return [3 /*break*/, 10];
            case 8: return [4 /*yield*/, Job_1.default.findById(jobId)];
            case 9:
                job = _b.sent();
                if (!job) {
                    return [2 /*return*/, res.status(404).json({ code: 404, message: 'Not found' })];
                }
                res.status(200).json({
                    code: 200,
                    message: 'Success',
                    payload: job
                });
                _b.label = 10;
            case 10: return [3 /*break*/, 12];
            case 11:
                err_2 = _b.sent();
                next(err_2);
                return [3 /*break*/, 12];
            case 12: return [2 /*return*/];
        }
    });
}); };
exports.getAllJobs = getAllJobs;
var createJob = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, position, workType, tags, location, minSalary, maxSalary, description, checkWorkType, checkLocation, tagIds, i, checkTag, job, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, position = _a.position, workType = _a.workType, tags = _a.tags, location = _a.location, minSalary = _a.minSalary, maxSalary = _a.maxSalary, description = _a.description;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 15, , 16]);
                return [4 /*yield*/, WorkType_1.default.findOne({ name: workType })];
            case 2:
                checkWorkType = _b.sent();
                if (!!checkWorkType) return [3 /*break*/, 4];
                checkWorkType = new WorkType_1.default({ name: workType });
                return [4 /*yield*/, checkWorkType.save()];
            case 3:
                _b.sent();
                _b.label = 4;
            case 4: return [4 /*yield*/, Location_1.default.findOne({ name: location })];
            case 5:
                checkLocation = _b.sent();
                if (!!checkLocation) return [3 /*break*/, 7];
                checkLocation = new Location_1.default({ name: location });
                return [4 /*yield*/, checkLocation.save()];
            case 6:
                _b.sent();
                _b.label = 7;
            case 7:
                tagIds = [];
                i = 0;
                _b.label = 8;
            case 8:
                if (!(i < tags.length)) return [3 /*break*/, 13];
                return [4 /*yield*/, Tag_1.default.findOne({ name: tags[i] })];
            case 9:
                checkTag = _b.sent();
                if (!!checkTag) return [3 /*break*/, 11];
                checkTag = new Tag_1.default({ name: tags[i] });
                return [4 /*yield*/, checkTag.save()];
            case 10:
                _b.sent();
                _b.label = 11;
            case 11:
                tagIds.push(checkTag._id);
                _b.label = 12;
            case 12:
                i++;
                return [3 /*break*/, 8];
            case 13:
                job = new Job_1.default({
                    position: position,
                    workType: checkWorkType._id,
                    tags: tagIds,
                    location: checkLocation._id,
                    minSalary: minSalary,
                    maxSalary: maxSalary,
                    description: description,
                });
                return [4 /*yield*/, job.save()];
            case 14:
                _b.sent();
                res.status(200).json({
                    code: 200, message: 'Success'
                });
                return [3 /*break*/, 16];
            case 15:
                err_3 = _b.sent();
                next(err_3);
                return [3 /*break*/, 16];
            case 16: return [2 /*return*/];
        }
    });
}); };
exports.createJob = createJob;
var updateJob = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var jobId, _a, position, workType, tags, location, minSalary, maxSalary, description, job, checkWorkType, checkLocation, err_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                jobId = req.params.id;
                _a = req.body, position = _a.position, workType = _a.workType, tags = _a.tags, location = _a.location, minSalary = _a.minSalary, maxSalary = _a.maxSalary, description = _a.description;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 12, , 13]);
                return [4 /*yield*/, Job_1.default.findById(jobId)];
            case 2:
                job = _b.sent();
                if (!job) {
                    return [2 /*return*/, res.status(404).json({ message: 'Not found' })];
                }
                if (position)
                    job.position = position;
                if (!workType) return [3 /*break*/, 6];
                return [4 /*yield*/, WorkType_1.default.findOne({ name: workType })];
            case 3:
                checkWorkType = _b.sent();
                if (!!checkWorkType) return [3 /*break*/, 5];
                checkWorkType = new WorkType_1.default({ name: workType });
                return [4 /*yield*/, checkWorkType.save()];
            case 4:
                _b.sent();
                _b.label = 5;
            case 5:
                job.workType = checkWorkType._id;
                _b.label = 6;
            case 6:
                ;
                if (tags)
                    job.tags = tags;
                if (!location) return [3 /*break*/, 10];
                return [4 /*yield*/, Location_1.default.findOne({ name: location })];
            case 7:
                checkLocation = _b.sent();
                if (!!checkLocation) return [3 /*break*/, 9];
                checkLocation = new Location_1.default({ name: location });
                return [4 /*yield*/, checkLocation.save()];
            case 8:
                _b.sent();
                _b.label = 9;
            case 9:
                job.location = checkLocation._id;
                _b.label = 10;
            case 10:
                ;
                if (minSalary)
                    job.minSalary = minSalary;
                if (maxSalary)
                    job.maxSalary = maxSalary;
                if (description)
                    job.description = description;
                return [4 /*yield*/, job.save()];
            case 11:
                _b.sent();
                res.status(200).json({
                    code: 200,
                    message: 'Job updated successfully'
                });
                return [3 /*break*/, 13];
            case 12:
                err_4 = _b.sent();
                next(err_4);
                return [3 /*break*/, 13];
            case 13: return [2 /*return*/];
        }
    });
}); };
exports.updateJob = updateJob;
var deleteJob = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var jobId, job, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jobId = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Job_1.default.findByIdAndDelete(jobId)];
            case 2:
                job = _a.sent();
                if (!job) {
                    return [2 /*return*/, res.status(404).json({ code: 404, message: 'Job not found' })];
                }
                res.status(200).json({ code: 200, message: 'Job deleted successfully' });
                return [3 /*break*/, 4];
            case 3:
                err_5 = _a.sent();
                next(err_5);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteJob = deleteJob;
