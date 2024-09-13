const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const cookieparser = require("cookie-parser");
const userRoute = require("./routes/user");
const postRoute = require("./routes/post");
const commentRoute = require("./routes/comment");
const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(cookieparser());
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connected to mongodb compass"))
  .catch((error) => console.log(error.message));

app.use(userRoute);
app.use(postRoute);
app.use(commentRoute);

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
