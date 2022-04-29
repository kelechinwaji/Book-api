import bcrypt, { hash } from "bcrypt";

import { type } from "os";
import client from "../database";

export type User = {
  username: string;
  password: string;
};

const saltRounds = parseInt(process.env.SALT_ROUNDS as string);
const pepper: string | undefined = process.env.BCRYPT_PASSWORD as string;

export class UserStore {

  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM users";
      const res = await conn.query(sql);
      conn.release();
     
      
      console.log(res);
      
      return res.rows;
    } catch (error) {
      throw new Error(`could not get all from users ${error}`);
    }
  }

 async show(id : string):Promise<User[]> {
  try {
    const conn = await client.connect();
    const sql = "SELECT * FROM users WHERE id = ($1)";
    const values = [id];
    const res = await conn.query(sql, values);
    const item = res.rows[0];
    conn.release();
    return item
  } catch (error) {
    throw new Error(`could not find user with id ${id}`)
  }
}

  async create(user: User): Promise<User> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO users (username, password_digest) VALUES ($1,$2) RETURNING *";
      const hash = bcrypt.hashSync(user.password + pepper, saltRounds);
      const result = await conn.query(sql, [user.username, hash]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to create user ${user.username}: ${error}`);
    }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    const conn = await client.connect();
    const sql = "SELECT password_digest FROM users WHERE username = ($1)";
    const result = await conn.query(sql, [username]);
    if (result.rows.length) {
      const user = result.rows[0];
      if (bcrypt.compareSync(password + pepper, user.password_digest)) {
        return user;
      }
    }
    return null;
  }
}
