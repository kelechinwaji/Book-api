import  Jwt  from "jsonwebtoken";
import express, { Request, Response } from "express";
import { User, UserStore} from "../models/user";

const store = new UserStore()  //this provides the methods for the database queries

const create = async (req: Request, res: Response) => {
    const addUser: User = {
        username: req.body.username,
        password: req.body.password,
        
      };
    try {
     
      const newUser = await store.create(addUser);
      //@ts-ignore
      const token = Jwt.sign({user: newUser}, process.env.TOKEN_SECRET )
  
      res.json(token);
    } catch (error) {

        
      res.status(400);
      res.json(error);
    }
  };

  const authenticate = async (req: Request, res: Response) =>{

    const user: User = {
        username: req.body.username,
        password: req.body.password
    }

      try {
          const authenticatedUser =await store.authenticate(req.body.username, req.body.password);
           //@ts-ignore
          const token = Jwt.sign({user: authenticate}, process.env.TOKEN_SECRET)
          res.json(token);
      } catch (error) {
          res.status(401);
          res.json({error})

          
      }
  }

  const user_routes = (app: express.Application) => {
    // app.get("/adventure-books", index);
     app.post("/login", authenticate);
     app.post("/user", create);
    // app.put("/adventure-books/:id", update);
    // app.delete("/adventure-books/:id", destroy);
  };
  
  export default user_routes;
  