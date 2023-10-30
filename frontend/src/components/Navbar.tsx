import { Dispatch, SetStateAction } from "react";
import "./navbar.css";
import { Team, ToDoMeInterface } from "../interfaces";
interface Props {
  handleSetAccessToken: (any: string) => void;
  handleSetTeams: Dispatch<SetStateAction<Team[]>>;
  handleSetTodos: Dispatch<SetStateAction<ToDoMeInterface[]>>;
  setMeTab: Dispatch<SetStateAction<boolean>>;
  hanldeSetActiveTab: Dispatch<SetStateAction<number>>;
}
const Navbar = ({
  handleSetAccessToken,
  handleSetTeams,
  handleSetTodos,
  setMeTab,
  hanldeSetActiveTab,
}: Props) => {
  return (
    <div className="navbar">
      <h1>📝ToDoApp</h1>

      <ul className="navbar-ul">
        <li onClick={() => setMeTab(true)}>Me</li>
        <li
          onClick={() => {
            localStorage.clear(), handleSetAccessToken("");
            hanldeSetActiveTab(0);
            handleSetTeams([]), handleSetTodos([]);
          }}
        >
          LogOut
        </li>
      </ul>
    </div>
  );
};
export default Navbar;
