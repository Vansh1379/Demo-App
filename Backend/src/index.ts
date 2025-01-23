import express from "express";
import mainRouter from "./routes/mainRouter"
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.use("/", mainRouter);

app.listen(PORT, () => {
    console.log(`Your app is running at port http://localhost:${PORT}`);
});