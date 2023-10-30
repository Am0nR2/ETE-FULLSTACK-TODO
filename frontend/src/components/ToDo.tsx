import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import "./todo.css";
import CloseBtn from "./CloseBtn";
import axios from "axios";
interface Props {
  title: string;
  context: string;
  creator?: number;
  currentUser?: number;
  id?: number;
  accessToken?: string;
  setDbMessagerState?: Dispatch<SetStateAction<string>>;
  addCloseBtn?: boolean;
  done?: boolean;
}
const ToDo: React.FC<Props> = ({
  title,
  context,
  creator,
  currentUser,
  id,
  accessToken,
  setDbMessagerState,
  addCloseBtn = true,
  done,
}: Props) => {
  const [isDone, setIsDone] = useState<{ done: boolean }>({
    done: done || false,
  });
  const handleDoneClick = () =>
    setIsDone((prevState) => ({ done: !prevState.done }));

  useEffect(() => {
    if (id !== 0 && accessToken) {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      axios
        .patch(`http://localhost:3000/todo/${id}`, isDone, { headers })
        .then((response) => {
          setDbMessagerState ? setDbMessagerState(response.data.msg) : {};
        })
        .catch((error) => {
          console.error("request failed:", error);
          console.log(error);
        });
    }
  }, [isDone]);
  // , id, setDbMessagerState, accessToken
  const handleDeleteBtn = () => {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    axios
      .delete(`http://localhost:3000/todo/${id}`, { headers })
      .then((response) => {
        setDbMessagerState ? setDbMessagerState(response.data.msg) : {};
        console.log(response.data.msg);
      })
      .catch((error) => {
        console.error("GET request failed:", error);
      });
  };

  return (
    <div
      className="todo"
      style={{
        backgroundColor: creator === currentUser ? "pink" : "",
        textDecoration: isDone.done ? "line-through" : "",
      }}
    >
      {addCloseBtn && <CloseBtn handleClick={handleDeleteBtn} />}
      <div>
        <h3>{title}</h3>
        {addCloseBtn && (
          <input
            checked={isDone.done}
            onChange={handleDoneClick}
            type="checkbox"
          />
        )}
      </div>
      <p>{context}</p>
    </div>
  );
};
export default ToDo;
