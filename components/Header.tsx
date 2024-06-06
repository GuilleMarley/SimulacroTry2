import { FunctionComponent } from "preact";
import { Logout } from "../islands/Logout.tsx";

type data = {
  name: string;
};

export const Header: FunctionComponent<data> = ({ name }) => {
  return (
    <header class="header-container">
      <div class="header-content">
        <span class="user-name">{name}</span>
        <Logout />
      </div>
    </header>
  );
};
