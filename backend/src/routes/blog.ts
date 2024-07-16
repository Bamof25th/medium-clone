import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

//middleware
blogRouter.use("/*", async (c, next) => {
  //get the header
  const header = c.req.header("authorization") || "";
  const token = header.split("")[1];
  //verify the header
  const responce = await verify(token, c.env.JWT_SECRET);

  //if header is correct we need to process
  if (responce.id) {
    next();
  } else {
    // if not , we return the user 403 code
    c.status(403);
    return c.json({ error: "unauthorized" });
  }
});

blogRouter.post("/", (c) => {
  return c.text("asdasd");
});
blogRouter.put("/", (c) => {
  return c.text("asdasd");
});
blogRouter.get("/", (c) => {
  return c.text("asdasd");
});
blogRouter.get("/bulk", (c) => {
  return c.text("asdasd");
});
