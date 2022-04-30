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
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../database"));
class OrderStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `SELECT * FROM orders`;
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`unable to get orders ${error}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "SELECT * FROM orders WHERE id = ($1)";
                const res = yield conn.query(sql, [id]);
                const item = res.rows[0];
                conn.release();
                return item;
            }
            catch (error) {
                throw new Error(`could not find orders with id ${id}`);
            }
        });
    }
    create(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const text = "INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *";
                const values = [order.status, order.userId];
                const result = yield conn.query(text, values);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Could not add new order ${order}. Error: ${error}`);
            }
        });
    }
    addProduct(quantity, orderId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *';
                const result = yield conn.query(sql, [orderId, productId, quantity]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`could not add product ${productId} to order ${orderId}: ${error}`);
            }
        });
    }
}
exports.OrderStore = OrderStore;
