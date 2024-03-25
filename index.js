const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const port = 3000;
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
const cors = require("cors");

dotenv.config();
app.use(cors());

// stripe payment
const createCheckoutSession = require("./stripeApi/checkout");
//const webhook = require("./stripeApi/webhook");
app.use(
  express.json({
    verify: (req, res, buffer) => (req["rawBody"] = buffer),
  })
);

app.post("/create-checkout-session", createCheckoutSession);
//app.post("/webhook", webhook);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connected"))
  .catch((err) => {
    console.log("DB connection failed", err);
  });

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(process.env.PORT || port, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);
