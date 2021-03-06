import express, { Request, Response } from "express";
import Jwt from "jsonwebtoken";
import { Order, OrderStore } from "../models/orders";
import { verifyAuthToken } from "./user";

const store = new OrderStore(); //this provides the methods for the database queries

const index = async (req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      status: req.body.status,
      userId: req.body.userId,
    };

    const newOrder = await store.create(order);

    res.json(newOrder);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const orderShow = await store.show(req.params.id);
    res.json(orderShow);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const addProduct = async (req: Request, res: Response) => {
  try {
      console.log(req.body, '', req.params);
      
    const orderId = req.params.id;
    const productId = req.body.productId;
    const quantity = parseInt(req.body.quantity);
    const addProduct = await store.addProduct(quantity, orderId, productId);
    res.json(addProduct);
  } catch (error) {
      console.log(error);
      
    res.status(400);
    res.json(error);
  }
};

const orderRoutes = (app: express.Application) => {
  app.get("/orders", verifyAuthToken, index);
  app.get("/orders/:id", verifyAuthToken, show);
  app.post("/orders/", verifyAuthToken, create);
  app.post("/orders/:id/product", verifyAuthToken, addProduct);
};

export default orderRoutes;
