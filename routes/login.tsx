import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { LoginForm } from "../components/LoginForm.tsx";
import jwt from "jsonwebtoken";
import { USerInfo } from "./_middleware.ts";

export const handler: Handlers<string, USerInfo> = {
  POST: async (req: Request, ctx: FreshContext<USerInfo, string>) => {
    const form = await req.formData();

    const user = await form.get("email")?.toString();
    const password = await form.get("password")?.toString();

    const data = await fetch(
      `${Deno.env.get("URL_API")}/checkuser`,
      {
        method: "post",
        body: JSON.stringify({ email: user, password: password }),
        headers: { "content-type": "aplication/json" },
      },
    );

    if (data.status !== 200) {
      return ctx.render("Incorrect credentials");
    }

    const dataObject: USerInfo = await data.json();
    const token = await jwt.sign(dataObject, Deno.env.get("JWTSecret"));

    
    
  },
};

export default function Page(props: PageProps<string, USerInfo>) {
  return <LoginForm error={props.data} />;
}
