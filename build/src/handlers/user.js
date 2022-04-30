"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const store = new user_1.UserStore(); //this provides the methods for the database queries
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield store.index();
        res.json(user);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield store.show(req.params.id);
        res.json(user);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const addUser = {
        username: req.body.username,
        password: req.body.password,
    };
    try {
        const newUser = yield store.create(addUser);
        //@ts-ignore
        const token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const authenticate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        username: req.body.username,
        password: req.body.password,
    };
    try {
        const authenticatedUser = yield store.authenticate(req.body.username, req.body.password);
        //@ts-ignore
        const token = jsonwebtoken_1.default.sign({ user: authenticate }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (error) {
        res.status(401);
        res.json({ error });
    }
});
//@ts-ignore
const verifyAuthToken = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader === null || authorizationHeader === void 0 ? void 0 : authorizationHeader.split(" ")[1];
        //@ts-ignore
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        next();
    }
    catch (error) {
        res.status(401);
        res.json({ error });
    }
};
exports.verifyAuthToken = verifyAuthToken;
const user_routes = (app) => {
    app.get("/users", index);
    app.get("/users/:id", show);
    app.post("/login", exports.verifyAuthToken, authenticate);
    app.post("/users", create);
    // app.delete("/adventure-books/:id", destroy);
};
exports.default = user_routes;
