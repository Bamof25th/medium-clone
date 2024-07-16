// prisma client
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Context } from "hono";
import { decode, sign, verify } from "hono/jwt";

export const signUp = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  try {
    const user = await prisma.user.create({
      data: {
        name: body?.name,
        email: body.email,
        password: body.password,
      },
    });

    const token = await sign({ id: user.id }, c.env.MY_JWT_SECRET);

    return c.json({ jwt: token });
  } catch (error) {
    c.status(403);
    console.log(error);
  }
};
