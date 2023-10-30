import { Dispatch, SetStateAction } from "react";
import CloseBtn from "./CloseBtn";
import "./me.css";
interface Props {
  username: string;
  email: string;
  setMeTab: Dispatch<SetStateAction<boolean>>;
}
const Me = ({ username, email, setMeTab }: Props) => {
  return (
    <div className="me">
      <img
        src="https://pbs.twimg.com/profile_images/587949417577066499/3uCD4xxY_400x400.jpg"
        alt="World"
      />
      <ul>
        <li>
          <span>USERNAME: </span> {username}
        </li>
        <li>
          <span>E-MAIL: </span> {email}
        </li>
      </ul>
      <CloseBtn handleClick={() => setMeTab(false)}></CloseBtn>
    </div>
  );
};
export default Me;
