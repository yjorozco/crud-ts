"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_config_1 = __importDefault(require("./config/database.config"));
const app = express_1.default();
const port = 9000;
database_config_1.default.sync().then(() => {
    console.log('conect to db');
});
app.post("/creaes", (req, res) => {
    console.log(req.body);
    return res.send('');
});
app.listen(port, () => {
    console.log("server is running on port");
});
