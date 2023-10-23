import express from 'express';
import userRouter from "./routes/user.js";
import errorMiddleware from './middlewares/Error.js';
const app = express();

app.use("/user", userRouter);

app.listen(4500, () => {
    console.log(`Server is working`);
})

app.use(errorMiddleware);