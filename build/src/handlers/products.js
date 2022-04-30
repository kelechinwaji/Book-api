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
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../models/products");
const user_1 = require("./user");
const store = new products_1.ProductStore(); //this provides the methods for the database queries
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield store.index();
        res.json(products);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = {
            name: req.body.name,
            price: req.body.price,
        };
        const newProduct = yield store.create(product);
        res.json(newProduct);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productShow = yield store.show(req.params.id);
        res.json(productShow);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const productRoutes = (app) => {
    app.get("/products", user_1.verifyAuthToken, index);
    app.get("/products/:id", user_1.verifyAuthToken, show);
    app.post("/products", user_1.verifyAuthToken, create);
};
exports.default = productRoutes;
