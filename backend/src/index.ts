import { Hono } from "hono";
import { verify } from "hono/jwt";
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";

// hono init
const app = new Hono<{
  Bindings: {
    JWT_SECRET: string;
  };
}>();

// routes
app.route("/api/v1/user", userRouter);
app.route("/api/v1/book", blogRouter);

export default app;
