import React, { Dispatch, SetStateAction } from "react";
import "./item.css";
import CloseBtn from "./CloseBtn";
import axios from "axios";
interface Props {
  itemName?: string;
  setActiveTabState?: Dispatch<SetStateAction<number>>;
  id: number;
  activeTabState: number;
  userId: number;
  creator: number;
  accessToken: string;
  team?: boolean;
  teamId?: number;
  setErrorMessageState: Dispatch<SetStateAction<string>>;
}
const Item: React.FC<Props> = ({
  itemName = "Item (--X--)",
  id,
  setActiveTabState,
  activeTabState,
  userId,
  creator,
  accessToken,
  team = true,
  teamId,
  setErrorMessageState,
}: Props) => {
  const handleDeleteBtn = () => {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const baseURI = `http://localhost:3000/team/${teamId ? teamId : id}`;

    const httpMethod = team ? "DELETE" : "PATCH";

    axios({
      method: httpMethod,
      url: baseURI,
      data: team ? {} : { delete_user: id },
      headers: headers,
    })
      .then((response) => {
        console.log(response);
        setErrorMessageState(response.data.msg);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      style={{
        backgroundColor: activeTabState === id ? "rgb(132, 165, 165)" : "",
      }}
      className="item"
      onClick={setActiveTabState ? () => setActiveTabState(id) : () => {}}
    >
      {userId === creator && userId !== id && (
        <CloseBtn handleClick={handleDeleteBtn} />
      )}

      <img
        // src="https://images.theconversation.com/files/378097/original/file-20210111-23-bqsfwl.jpg?ixlib=rb-1.1.0&rect=36%2C84%2C7980%2C5072&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip"
        src="https://pbs.twimg.com/profile_images/587949417577066499/3uCD4xxY_400x400.jpg"
        alt="World"
      />

      <h3>{itemName}</h3>
    </div>
  );
};
export default Item;
