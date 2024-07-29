const express = require("express");
const app = express();

app.use(express.json());

const Users = require("./routes/users");
app.use("/users", Users);

const Products = require("./routes/products");
app.use("/products", Products);

const PORT = 8000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
