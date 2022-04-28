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
exports.AdventureBookStore = void 0;
const database_1 = __importDefault(require("../database"));
class AdventureBookStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "SELECT * FROM district_area";
                const res = yield conn.query(sql);
                conn.release();
                return res.rows;
            }
            catch (error) {
                throw new Error(`could not connect\fetch data from db ${error}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "SELECT * FROM district_area WHERE id = ($1)";
                const values = [id];
                const res = yield conn.query(sql, values);
                const item = res.rows[0];
                conn.release();
                return item;
            }
            catch (error) {
                throw new Error(`could not find book with id ${id}`);
            }
        });
    }
    create(book) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const text = "INSERT INTO district_area (title, author, total_pages, summary) VALUES($1, $2, $3, $4) RETURNING *";
                const values = [book.title, book.author, book.total_pages, book.summary];
                const res = yield conn.query(text, values);
                const item = res.rows;
                conn.release();
                return item;
            }
            catch (error) {
                throw new Error(`Could not add new book ${book.title}. Error: ${error}`);
            }
        });
    }
    update(id, title, author, summary, total_pages) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const text = `UPDATE district_area  SET title = ($1), author = ($2), total_pages = ($3), summary = ($4) WHERE id = '${id}' RETURNING *`;
                const values = [title, author, total_pages, summary];
                const res = yield conn.query(text, values);
                const item = res.rows[0];
                conn.release();
                return item;
            }
            catch (error) {
                throw new Error(`Could not update book ${title}. Error: ${error}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const text = `DELETE FROM district_area WHERE id = '${id}' RETURNING *`;
                const res = yield conn.query(text);
                const item = res.rows[0];
                conn.release();
                return item;
            }
            catch (error) {
                throw new Error(`Could not delete book with id ${id}. Error: ${error}`);
            }
        });
    }
}
exports.AdventureBookStore = AdventureBookStore;
