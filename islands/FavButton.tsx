import { useState } from "preact/hooks";
import { FunctionComponent } from "preact";
import { VideoType } from "../types.ts";

export const FavButton: FunctionComponent<{ video: VideoType; id: string }> = (
  { video, id },
) => {
  const [favourite, setFavourite] = useState<boolean>(video.fav);

  const thisFav = async () => {
    console.log(video);
    console.log(video.id);
    const data = await fetch(
      `https://videoapp-api.deno.dev/fav/${id}/${video.id}`,
      {
        method: "post",
      },
    );
    console.log(data);
    if (data.status !== 200) {
      console.log("no funciona");
      return;
    }
    setFavourite(!favourite);
    return;
  };

  return (
    <button
      class="fav-button"
      onClick={() => {
        thisFav();
      }}
    >
      {favourite ? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}
    </button>
  );
};
