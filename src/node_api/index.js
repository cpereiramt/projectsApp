const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { indexRouter } = require("./routes");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use("/", indexRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
