import { Hono } from "hono";
import { medium } from "./routes";


// hono init
const app = new Hono();

// routes
app.route("/api/v1", medium);


export default app;
