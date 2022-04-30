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
const orders_1 = require("../models/orders");
const user_1 = require("./user");
const store = new orders_1.OrderStore(); //this provides the methods for the database queries
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield store.index();
        res.json(orders);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = {
            status: req.body.status,
            userId: req.body.userId,
        };
        const newOrder = yield store.create(order);
        res.json(newOrder);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderShow = yield store.show(req.params.id);
        res.json(orderShow);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body, '', req.params);
        const orderId = req.params.id;
        const productId = req.body.productId;
        const quantity = parseInt(req.body.quantity);
        const addProduct = yield store.addProduct(quantity, orderId, productId);
        res.json(addProduct);
    }
    catch (error) {
        console.log(error);
        res.status(400);
        res.json(error);
    }
});
const orderRoutes = (app) => {
    app.get("/orders", user_1.verifyAuthToken, index);
    app.get("/orders/:id", user_1.verifyAuthToken, show);
    app.post("/orders/", user_1.verifyAuthToken, create);
    app.post("/orders/:id/product", user_1.verifyAuthToken, addProduct);
};
exports.default = orderRoutes;
