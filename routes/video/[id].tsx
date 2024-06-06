import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { VideoUnique } from "../../components/VideoUnique.tsx";
import { VideoType } from "../../types.ts";
import { USerInfo } from "../_middleware.ts";

type Data = {
  videos: VideoType[];
  id: string;
};

export const handler: Handlers<Data, USerInfo> = {
  GET: async (_req: Request, ctx: FreshContext<USerInfo, Data>) => {
    const id = ctx.state.id;
    const data = await fetch(
      `${Deno.env.get("URL_API")}/video/${ctx.state.id}/${ctx.params.id}`,
    );
    const videos = await data.json();
    return ctx.render({ videos, id });
  },
};

export default function Page(props: PageProps) {
  return <VideoUnique video={props.data.videos} id={props.data.id} />;
}
