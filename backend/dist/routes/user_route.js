"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var user_controller_1 = require("../controllers/user_controller");
router.get('/users', user_controller_1.getUserById);
router.put('/users', user_controller_1.updateUser);
router.delete('/users', user_controller_1.deleteUser);
router.get('/users/saved-jobs', user_controller_1.getSavedJobs);
router.post('/users/saved-jobs/:jobId', user_controller_1.saveJob);
router.delete('/users/saved-jobs/:jobId', user_controller_1.unsaveJob);
exports.default = router;
