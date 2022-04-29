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
const books_structure_1 = require("../models/books_structure");
const user_1 = require("./user");
const book = new books_structure_1.AdventureBookStore(); //this provides the methods for the database queries
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield book.index();
        res.json(books);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const addBook = {
            title: req.body.title,
            author: req.body.author,
            total_pages: req.body.total_pages,
            type: req.body.type,
            summary: req.body.summary,
        };
        const newBook = yield book.create(addBook);
        res.json(newBook);
    }
    catch (error) {
        console.log(error);
        res.status(400);
        res.json(error);
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const showBook = yield book.show(req.params.id);
        res.json(showBook);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const upBook = yield book.update(req.params.id, req.body.title, req.body.author, req.body.summary, req.body.total_pages);
    res.json(upBook);
});
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedBook = yield book.delete(req.params.id);
    res.json(deletedBook);
});
const adventure_book_routes = (app) => {
    app.get("/adventure-books", index);
    app.get("/adventure-books", show);
    app.post("/adventure-books/", user_1.verifyAuthToken, create);
    app.put("/adventure-books/:id", user_1.verifyAuthToken, update);
    app.delete("/adventure-books/:id", user_1.verifyAuthToken, destroy);
};
exports.default = adventure_book_routes;
