import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { VideoType } from "../types.ts";
import jwt from "jsonwebtoken";
import { USerInfo } from "./_middleware.ts";
import { RegisterForm } from "../components/RegisterForm.tsx";

export const handler: Handlers<VideoType[], USerInfo> = {
  POST: async (req: Request, ctx: FreshContext<USerInfo, VideoType[]>) => {
    const form = await req.formData();

    const user = await form.get("email")?.toString();
    const password = await form.get("password")?.toString();
    const name = await form.get("name")?.toString();

    const data = await fetch(
      `${Deno.env.get("URL_API")}/register`,
      {
        method: "post",
        body: JSON.stringify({ email: user, password: password, name: name }),
        headers: { "content-type": "aplication/json" },
      },
    );

    if (data.status !== 200) {
      return ctx.render();
    }

    const dataObject: USerInfo = await data.json();
    const token = await jwt.sign(dataObject, Deno.env.get("JWTSecret"));

    const headers = new Headers({
      location: "/videos",
      "Set-Cookie": `auth=${token}`,
    });
    return new Response("", { status: 302, headers });
  },
};

export default function Page(_props: PageProps<unknown, USerInfo>) {
  return <RegisterForm />;
}
