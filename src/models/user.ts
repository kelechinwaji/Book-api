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
