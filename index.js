const express = require("express");
const mongoose = require("mongoose");

const authRouter = require("./routes/auth");
const categoryRouter = require("./routes/category");
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");


const PORT = process.env.PORT || 3000;
const app = express();
const { Cors } = require('./middlewares/cors')

const DB ="mongodb+srv://Adam_Jardali:Adam_Jardali@cluster0.s5ruryh.mongodb.net/?retryWrites=true&w=majority";

app.use(express.json());
app.use(authRouter);
app.use(categoryRouter);
app.use(productRouter);
app.use(userRouter);
app.use(Cors);

mongoose
  .connect(DB)
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(PORT, "0.0.0.0", () => {
  console.log(`connected at port ${PORT}`);
});