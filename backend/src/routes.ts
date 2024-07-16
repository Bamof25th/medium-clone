import { Hono } from "hono";
import { signUp } from "./controller";

export const medium = new Hono();

medium.post("/signup", signUp);

medium.post("/signin", (c) => {
  return c.text("post userup Hono!");
});

medium.post("/blog", (c) => {
  return c.text("post blog Hono!");
});

medium.put("/blog", (c) => {
  return c.text("put Hono!");
});

medium.get("/blog", (c) => {
  return c.text("get blog");
});
