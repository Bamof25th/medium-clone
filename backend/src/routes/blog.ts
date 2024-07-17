import { createBlogInput, updateBlogInput } from "@aniketbaghel/medium-common";
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
  const token = c.req.header("authorization") || "";
  try {
    //verify the header
    const user = await verify(token, c.env.JWT_SECRET);
    //if header is correct we need to process
    if (user) {
      c.set("userId", `${user.id}`);
      await next();
    } else {
      // if not , we return the user 403 code
      c.status(403);
      return c.json({ error: "unauthorized" });
    }
  } catch (error) {
    c.status(403);
    return c.json({ message: "you are not logged in" });
  }
});

blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = createBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ message: "Inputs are not correct" });
  }
  const userId = c.get("userId");
  console.log(body);
  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: userId,
    },
  });
  return c.json({ id: blog.id });
});

blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const { success } = updateBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ message: "Inputs are not correct" });
  }
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

blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const id = c.req.param("id");
    const blogs = await prisma.post.findFirst({
      where: {
        id: parseInt(id),
      },
    });
    return c.json({ blogs });
  } catch (error) {
    c.status(403);
    return c.json({ message: "error while fetching" });
  }
});
