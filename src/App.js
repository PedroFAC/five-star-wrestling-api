const express = require("express");
const { getMatches } = require("./services");
const cors = require("cors");
const app = express();

app.use(cors());
app.get("/", getMatches);

app.listen(process.env.PORT || 3000);
