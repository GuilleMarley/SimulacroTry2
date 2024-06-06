import { FunctionComponent } from "preact";

export const Logout: FunctionComponent = () => {
  const deleteCookie = () => {
    document.cookie = "auth= ; Max-Age=0.1;";
    const headers = new Headers({
      location: "/login",
    });
    return new Response("", { status: 302, headers });
  };

  return (
    <a
      href="/login"
      class="logout-button"
      onClick={() => deleteCookie()}
    >
      Logout
    </a>
  );
};
