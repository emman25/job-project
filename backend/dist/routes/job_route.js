"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var job_controller_1 = require("../controllers/job_controller");
router.get('/jobs', job_controller_1.getAllJobs);
router.get('/jobs/:id', job_controller_1.getJobsById);
router.post('/jobs', job_controller_1.createJob);
router.put('/jobs/:id', job_controller_1.updateJob);
router.delete('/jobs/:id', job_controller_1.deleteJob);
exports.default = router;
