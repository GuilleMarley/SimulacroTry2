import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { VideoList } from "../components/VideoList.tsx";
import { VideoType } from "../types.ts";
import { USerInfo } from "./_middleware.ts";

type Data = {
  videos: VideoType[];
  id: string;
};

export const handler: Handlers<Data, USerInfo> = {
  GET: async (_req: Request, ctx: FreshContext<USerInfo, Data>) => {
    const id = ctx.state.id;
    const data = await fetch(
      `${Deno.env.get("URL_API")}/videos/${ctx.state.id}`,
    );
    const videos: VideoType[] = await data.json();
    console.log(videos);

    return ctx.render({ videos, id });
  },
};

export default function Page(props: PageProps) {
  return <VideoList videos={props.data.videos} id={props.data.id}></VideoList>;
}
