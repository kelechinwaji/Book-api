import express, { Request, Response } from "express";
import Jwt from "jsonwebtoken";
import { Book, AdventureBookStore } from "../models/books_structure";
import { verifyAuthToken } from "./user";


const book = new AdventureBookStore(); //this provides the methods for the database queries

const index = async (req: Request, res: Response) => {
  try {
    const books = await book.index();
    res.json(books);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const addBook: Book = {
      title: req.body.title,
      author: req.body.author,
      total_pages: req.body.total_pages,
      type: req.body.type,
      summary: req.body.summary,
    };

    const newBook = await book.create(addBook);

    res.json(newBook);
  } catch (error) {
    console.log(error);

    res.status(400);
    res.json(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const showBook = await book.show(req.params.id);
    res.json(showBook);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const update = async (req: Request, res: Response) => {
  const upBook = await book.update(
    req.params.id,
    req.body.title,
    req.body.author,
    req.body.summary,
    req.body.total_pages
  );
  res.json(upBook);
};

const destroy = async (req: Request, res: Response) => {
  const deletedBook = await book.delete(req.params.id);
  res.json(deletedBook);
};

const adventure_book_routes = (app: express.Application) => {
  app.get("/adventure-books", index);
  app.get("/adventure-books", show);
  app.post("/adventure-books/", verifyAuthToken, create);
  app.put("/adventure-books/:id", verifyAuthToken, update);
  app.delete("/adventure-books/:id", verifyAuthToken, destroy);
};

export default adventure_book_routes;
