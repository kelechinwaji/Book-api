import { Book } from "./models/books_structure";
import express from "express";
import adventure_book_routes from "./handlers/books_structure";
import user_routes from "./handlers/user";
import orderRoutes from "./handlers/orders";
import productRoutes from "./handlers/products";




const app = express();
const PORT = 5000;
app.use(express.json())
app.use(express.urlencoded({extended: false}))
adventure_book_routes(app);
user_routes(app);
orderRoutes(app);
productRoutes(app);

app.listen(PORT, () => {
  console.log(`app is listening on port: ${PORT}`);
});

export default app;

