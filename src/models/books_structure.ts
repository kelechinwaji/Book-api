import client from "../database";

export type Book = {
  title: string;
  author: string;
  total_pages: number;
  type: string,
  summary: string;
}; 

export class AdventureBookStore {
  async index(): Promise<Book[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM district_area";
      const res = await conn.query(sql);
      conn.release();
      return res.rows;
    } catch (error) {
      throw new Error(`could not connect\fetch data from db ${error}`);
    }
  }

  async show(id : string):Promise<Book[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM district_area WHERE id = ($1)";
      const values = [id];
      const res = await conn.query(sql, values);
      const item = res.rows[0];
      conn.release();
      return item
    } catch (error) {
      throw new Error(`could not find book with id ${id}`)
    }
  }

  async create(book: Book): Promise<Book[]> {
    try {
      const conn = await client.connect();
      const text =
        "INSERT INTO district_area (title, author, total_pages, summary) VALUES($1, $2, $3, $4) RETURNING *";
      const values = [book.title, book.author, book.total_pages, book.summary];
      const res = await conn.query(text, values);
      const item = res.rows;
      conn.release();
      return item;
    } catch (error) {
      throw new Error(`Could not add new book ${book.title}. Error: ${error}`);
    }
  }

  async update(id: string, title: string, author: string, summary: string, total_pages: number): Promise<Book> {
    try {
      const conn = await client.connect();
      const text =
        `UPDATE district_area  SET title = ($1), author = ($2), total_pages = ($3), summary = ($4) WHERE id = '${id}' RETURNING *`;
      const values = [title, author, total_pages, summary];
      const res = await conn.query(text, values);
      const item = res.rows[0];
      conn.release();
      return item;
    } catch (error) {
      throw new Error(`Could not update book ${title}. Error: ${error}`);
    }
  }

  async delete(id: string): Promise<Book> {
    try {
      const conn = await client.connect();
      const text = `DELETE FROM district_area WHERE id = '${id}' RETURNING *`;
      const res = await conn.query(text);
      const item = res.rows[0];
      conn.release();
      return item;
    } catch (error) {
      throw new Error(`Could not delete book with id ${id}. Error: ${error}`);
    }
  }
}
