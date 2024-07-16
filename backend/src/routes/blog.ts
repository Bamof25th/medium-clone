import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

//middleware
blogRouter.use("/*", async (c, next) => {
  //get the header
  const header = c.req.header("authorization") || "";
  const token = header.split("")[1];
  //verify the header
  const user = await verify(token, c.env.JWT_SECRET);
  //if header is correct we need to process
  if (user) {
    c.set("userId", `${user.id}`);
    next();
  } else {
    // if not , we return the user 403 code
    c.status(403);
    return c.json({ error: "unauthorized" });
  }
});

blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = c.req.json();
  const userId = c.get("userId");

  await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: userId,
    },
  });
  return c.json("post created");
});

blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = c.req.json();
  await prisma.post.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });
  return c.json("post updated");
});

blogRouter.get("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const body = c.req.json();
    const blogs = await prisma.post.findFirst({
      where: {
        id: body.id,
      },
    });
    return c.json({ blogs });
  } catch (error) {
    c.status(403);
    return c.json({ message: "error while fetching" });
  }
});

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const blogs = await prisma.post.findMany();
    return c.json({ blogs });
  } catch (error) {
    c.status(403);
    return c.json({ message: "error while fetching" });
  }
});
