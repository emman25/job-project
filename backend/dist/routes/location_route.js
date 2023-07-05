"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var location_controller_1 = require("../controllers/location_controller");
var router = express_1.default.Router();
router.get('/location', location_controller_1.getAllLocations);
router.post('/location', location_controller_1.createLocation);
router.delete('/location/:id', location_controller_1.deleteLocation);
router.put('/location/:id', location_controller_1.updateLocation);
exports.default = router;
