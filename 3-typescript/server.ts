import express from "express";
import { CreateCourse } from "./routes";

const app = express();

app.get("/", CreateCourse);

app.listen(3001, () => console.log("---- servidor rodando na 3001 ----"))