import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";
import { cors } from 'hono/cors'
// hono init
const app = new Hono<{
  Bindings: {
    JWT_SECRET: string;
  };
}>();
// middleare
app.use('/*', cors())

// routes
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

export default app;
