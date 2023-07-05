"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var jobapplication_controller_1 = require("../controllers/jobapplication_controller");
var router = express_1.default.Router();
router.post('/jobapplication', jobapplication_controller_1.createJobApplication);
exports.default = router;
