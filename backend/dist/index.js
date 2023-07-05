"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var mongoose_1 = __importDefault(require("mongoose"));
var auth_route_1 = __importDefault(require("./routes/auth_route"));
var job_route_1 = __importDefault(require("./routes/job_route"));
var location_route_1 = __importDefault(require("./routes/location_route"));
var user_route_1 = __importDefault(require("./routes/user_route"));
var work_type_1 = __importDefault(require("./routes/work_type"));
var jobapplication_routes_1 = __importDefault(require("./routes/jobapplication_routes"));
var tag_route_1 = __importDefault(require("./routes/tag_route"));
var http_status_codes_1 = require("http-status-codes");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var multer_1 = __importDefault(require("multer"));
var user_controller_1 = require("./controllers/user_controller");
var cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
var app = (0, express_1.default)();
var port = process.env.PORT;
var uploadDirectory = 'uploads';
var corsOptions = {
    origin: '*'
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.urlencoded({ limit: "1000mb", extended: true, parameterLimit: 50000 }));
app.use(express_1.default.json({ limit: "2mb" }));
app.use('/uploads', express_1.default.static(uploadDirectory));
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var upload = (0, multer_1.default)({ storage: storage });
app.use("/v1", auth_route_1.default);
app.use("/v1", job_route_1.default);
app.use("/v1", location_route_1.default);
app.use("/v1", work_type_1.default);
app.use("/v1", jobapplication_routes_1.default);
app.use("/v1", tag_route_1.default);
app.use(function (req, res, next) {
    var token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        var tokenArray = token.split(" ");
        var tokenValue = tokenArray[1];
        var decoded = jsonwebtoken_1.default.verify(tokenValue, process.env.JWT_SECRET);
        req.user = decoded === null || decoded === void 0 ? void 0 : decoded.user;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
});
app.use('/v1/users/cv', upload.single("file"), user_controller_1.uploadCV);
app.use('/v1/cv/download', user_controller_1.getCV);
app.use("/v1", user_route_1.default);
app.use(function (error, req, res, next) {
    var status = error.statusCode || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
    var message = error.message || "Something went wrong, please try again later";
    res.status(status).json({ code: status, message: message });
});
mongoose_1.default
    .connect(process.env.MONGODB_URI || "", { appName: process.env.APP_NAME })
    .then(function (result) {
    console.log("MongoDB Connected!");
})
    .catch(function (error) {
    console.log("ERROR :: MongoDB Connection :: ".concat(error));
});
app.listen(port, function () {
    console.log("\u26A1\uFE0F[server]: Server is running at http://localhost:".concat(port));
});
