"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_validator_1 = require("express-validator");
var auth_controller_1 = require("../controllers/auth_controller");
var router = express_1.default.Router();
router.post('/auth/register', [
    (0, express_validator_1.body)('name', 'Name is required').not().isEmpty(),
    (0, express_validator_1.body)('email', 'Please provide a valid email').isEmail(),
    (0, express_validator_1.body)('location', 'Please provide a valid location').not().isEmpty()
], auth_controller_1.registerUser);
router.get('/auth/verify', auth_controller_1.verifyEmail);
router.post('/auth/login', [
    (0, express_validator_1.body)('email', 'Please provide a valid email').isEmail(),
    (0, express_validator_1.body)('password', 'Password is required').exists(),
], auth_controller_1.loginUser);
exports.default = router;
