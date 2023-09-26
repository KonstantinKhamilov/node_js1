"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var app = (0, express_1.default)();
var port = 4000;
var requestCount = 0;
var lastHomePageRequestTime = Date.now();
function generateGradient() {
    var color1 = Math.floor(Math.random() * 16777215).toString(16);
    var color2 = Math.floor(Math.random() * 16777215).toString(16);
    var angle = Math.floor(Math.random() * 360);
    return "linear-gradient(".concat(angle, "deg, #").concat(color1, ", #").concat(color2, ")");
}
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.get('/', function (req, res) {
    requestCount++;
    lastHomePageRequestTime = Date.now();
    res.sendFile(path_1.default.join(__dirname, 'public', 'index.html'));
});
app.get('/library', function (req, res) {
    requestCount++;
    res.sendFile(path_1.default.join(__dirname, 'public', 'library.html'));
});
app.get('404.html', function (req, res) {
    requestCount++;
    res.sendFile(path_1.default.join(__dirname, 'public', '404.html'));
});
app.get('/gradient', function (req, res) {
    requestCount++;
    res.send({ gradient: generateGradient(), requestCount: requestCount });
});
app.get('/lastHomePageRequestTime', function (req, res) {
    requestCount++;
    res.send({ lastHomePageRequestTime: lastHomePageRequestTime });
});

app.listen(port, function () {
    console.log("Server is running at http://localhost:".concat(port));
});



