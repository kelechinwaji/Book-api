"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_structure_1 = __importDefault(require("./handlers/books_structure"));
const user_1 = __importDefault(require("./handlers/user"));
const app = (0, express_1.default)();
const PORT = 5000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
(0, books_structure_1.default)(app);
(0, user_1.default)(app);
app.listen(PORT, () => {
    console.log(`app is listening on port: ${PORT}`);
});
exports.default = app;
