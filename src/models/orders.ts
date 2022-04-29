import { type } from "os";
import client from "../database";

export type Order = {
    status: string;
    userId: string
};

export class OrderStore {
    async index(): Promise<Order[]>{
        try {
            const conn = await client.connect();
            const sql = `SELECT * FROM orders`;
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (error) {
            throw new Error(`unable to get orders ${error}`);
        }
    }

    async show(id: string): Promise<Order>{
        try {
            const conn = await client.connect();
            const sql = "SELECT * FROM orders WHERE id = ($1)";
            const res = await conn.query(sql, [id]);
            const item = res.rows[0];
            conn.release();
            return item
          } catch (error) {
            throw new Error(`could not find orders with id ${id}`)
          }
    }

    async create(order: Order): Promise<Order>{
        try {
            const conn = await client.connect();
            const text =
              "INSERT INTO orders (status, userId) VALUES($1, $2) RETURNING *";
            const values = [order.status, order.userId];
            const result = await conn.query(text, values);
            conn.release();
            return result.rows[0];
          } catch (error) {
            throw new Error(`Could not add new order ${order}. Error: ${error}`);
          }
    }

    async addProduct(quantity: number, orderId: string, productId: string): Promise<Order>{
     try {
         const conn = await client.connect();
         const sql = 'INSERT INTO order_products (orderId, productId, quantity) VALUES ($1, $2, $3)';
         const result = await conn.query(sql, [orderId, productId, quantity]);
         conn.release();
         return result.rows[0];
     } catch (error) {
         throw new Error(`could not add product ${productId} to order ${orderId}: ${error}`)
     }
    }

}

