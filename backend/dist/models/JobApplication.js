"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var jobApplicationSchema = new mongoose_1.default.Schema({
    jobId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Job', required: true },
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });
var JobApplication = mongoose_1.default.model('JobApplication', jobApplicationSchema);
exports.default = JobApplication;
