import "dotenv/config";
import cors from "cors";
import express from "express";
import routes from "./routes.js"

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());

routes(app);

app.listen(PORT, () => {
  console.log(`Servidor subiu na porta ${PORT}`);
});