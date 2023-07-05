"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var jobSchema = new mongoose_1.default.Schema({
    position: {
        type: String,
        required: true,
    },
    workType: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'WorkType',
        required: true
    },
    tags: {
        type: [{
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: 'Tag',
            }],
        required: true,
    },
    location: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Location',
        required: true,
    },
    minSalary: {
        type: Number,
        required: true,
    },
    maxSalary: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return value > this.minSalary;
            },
            message: 'Max salary must be greater than min salary',
        },
    },
    description: {
        type: String,
        required: true,
    }
}, { timestamps: true });
var Job = mongoose_1.default.model('Job', jobSchema);
exports.default = Job;
