"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var tag_controller_1 = require("../controllers/tag_controller");
router.get('/tags', tag_controller_1.getAlltag);
router.post('/tags', tag_controller_1.createTag);
router.put('/tags/:id', tag_controller_1.updateTag);
router.delete('/tags/:id', tag_controller_1.deleteTag);
exports.default = router;
