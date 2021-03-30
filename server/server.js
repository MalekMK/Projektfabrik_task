const express = require("express");
const mongoose = require("mongoose");

const app = express();

const orders = require("./routes/api/orders");
const items = require("./routes/api/items");
const users = require("./routes/api/users");
const auth = require("./routes/api/auth");

require('dotenv').config()

//Body parser middleware
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log("MongoDB connected successfully!"))
  .catch(err => console.log(err));

app.use("/api/orders", orders);
app.use("/api/items", items);
app.use("/api/users", users);
app.use("/api/auth", auth);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port : ${PORT}`);
});
