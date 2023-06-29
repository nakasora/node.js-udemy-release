import path from "path";
import express from "express";
import apiRoutes from "./api-routes/index.mjs";
import "./helpers/db.mjs";
import env from "dotenv";
// import cors from "cors";
env.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static("build"));
app.use(express.json());

app.use("/api", apiRoutes);
// app.use(
//   cors({
//     origin: "*",
//   })
// );

app.get("*", (req, res) => {
  const indexHTML = path.resolve("build", "index.html");
  res.sendFile(indexHTML);
});
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  return res.status(500).json({ msg: "不正なエラーが発生しました" });
});

app.use((req, res) => {
  return res.status(404).json({ msg: "Page Not Found" });
});
app.listen(PORT, () => {
  console.log(`Server Start localhost${PORT}`);
});
