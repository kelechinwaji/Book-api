import Jwt from "jsonwebtoken";
import express, { Request, Response } from "express";
import { User, UserStore } from "../models/user";

const store = new UserStore(); //this provides the methods for the database queries

const index = async (req: Request, res: Response) => {
  try {
    const user = await store.index();
    res.json(user);
  } catch (error) {

    res.status(400);
    res.json(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  const addUser: User = {
    username: req.body.username,
    password: req.body.password,
  };
  try {
    const newUser = await store.create(addUser);
    //@ts-ignore
    const token = Jwt.sign({ user: newUser }, process.env.TOKEN_SECRET);

    res.json(token);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const authenticate = async (req: Request, res: Response) => {
  const user: User = {
    username: req.body.username,
    password: req.body.password,
  };

  try {
    const authenticatedUser = await store.authenticate(
      req.body.username,
      req.body.password
    );
    //@ts-ignore
    const token = Jwt.sign({ user: authenticate }, process.env.TOKEN_SECRET);
    res.json(token);
  } catch (error) {
    res.status(401);
    res.json({ error });
  }
};
//@ts-ignore
export const verifyAuthToken = (req: Request, res: Response, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(" ")[1];
    //@ts-ignore
    const decoded = Jwt.verify(token, process.env.TOKEN_SECRET);
    next();
  } catch (error) {
    res.status(401);
    res.json({error})
  }
};

const user_routes = (app: express.Application) => {
 app.get("/users", index);
 app.get("/users/:id", show);
  app.post("/login", authenticate);
  app.post("/users", verifyAuthToken, create);
  // app.delete("/adventure-books/:id", destroy);
};

export default user_routes;
