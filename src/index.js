const express = require("express");
const { handler } = require("./controller");
const PORT = process.env.PORT || 4041;
const app = express();

app.use(express.json());

app.post("*", async (req, res) => {
  console.log(req.body);
  res.send(await handler(req));
});

app.get("*", async (req, res) => {
  res.send(await handler(req));
});

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`\x1b[36mServer is running on port ${PORT}\x1b[0m`);
});
