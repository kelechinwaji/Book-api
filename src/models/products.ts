import { type } from "os";
import client from "../database";

export type Product = {
    name: string;
    price: string
};

export class ProductStore {
    async index(): Promise<Product[]>{
        try {
            const conn = await client.connect();
            const sql = `SELECT * FROM products`;
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (error) {
            throw new Error(`unable to get products ${error}`);
        }
    }

    async show(id: string): Promise<Product>{
        try {
            const conn = await client.connect();
            const sql = "SELECT * FROM products WHERE id = ($1)";
            const res = await conn.query(sql, [id]);
            const item = res.rows[0];
            conn.release();
            return item
          } catch (error) {
            throw new Error(`could not find product with id ${id}`)
          }
    }

    async create(product: Product): Promise<Product>{
        try {
            const conn = await client.connect();
            const text =
              "INSERT INTO products (name, price) VALUES($1, $2) RETURNING *";
            const values = [product.name, product.price];
            const result = await conn.query(text, values);
            conn.release();
            return result.rows[0];
          } catch (error) {
            throw new Error(`Could not add new product ${product.name}. Error: ${error}`);
          }
    }
}