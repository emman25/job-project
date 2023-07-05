"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var worktype_controller_1 = require("../controllers/worktype_controller");
router.get('/work-types', worktype_controller_1.getAllWorkTypes);
router.post('/work-types', worktype_controller_1.createWorkType);
router.put('/work-types/:id', worktype_controller_1.updateWorkType);
router.delete('/work-types/:id', worktype_controller_1.deleteWorkType);
exports.default = router;
