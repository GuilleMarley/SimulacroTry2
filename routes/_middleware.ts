import { FreshContext } from "$fresh/server.ts";
import jwt from "jsonwebtoken";

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type USerInfo = Omit<User, "password">;

export const handler = async (req: Request, ctx: FreshContext<USerInfo>) => {
  if (ctx.destination !== "route") {
    const res = await ctx.next();
    return res;
  }

  if (ctx.route === "/login" || ctx.route === "/register") {
    const res = await ctx.next();
    return res;
  }

  const cookieRaw = req.headers.get("cookie");
  if (!cookieRaw) {
    const headers = new Headers({ location: "/login" });
    return new Response("", { headers, status: 302 });
  }

  const cookieT = await jwt.verify(
    cookieRaw.substring(5),
    Deno.env.get("JWTSecret"),
  );

  if (!cookieT) {
    const headers = new Headers({ location: "/login" });
    return new Response("", { headers, status: 302 });
  }

  ctx.state = cookieT;

  const res = await ctx.next();
  return res;
};
