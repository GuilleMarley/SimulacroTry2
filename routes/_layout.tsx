import { PageProps } from "$fresh/server.ts";
import { Header } from "../components/Header.tsx";
import { USerInfo } from "./_middleware.ts";

export default function Layout(props: PageProps<unknown, USerInfo>) {
  const name = props.state.name;
  return (
    <>
      {props.route !== "/login" && props.route !== "/register"
        ? (
          <div class="page-container">
            <Header name={name}></Header>
            <props.Component />
          </div>
        )
        : <props.Component />}
    </>
  );
}
