import { useEffect, useState } from "react";
import Button from "./Button";
import Input from "./Input";
import ListItems from "./ListItems";
import ToDo from "./ToDo";
import "./todolist.css";
import axios from "axios";
import Item from "./Item";
import { TodoInterface, UserInterface } from "../interfaces";
import ErrorContainer from "./ErrorContainer";

interface Props {
  accessToken: string;
  activeTab: number;
  userId: number;
}

const ToDolist = ({ accessToken, activeTab, userId }: Props) => {
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [dbMessage, setDbMessage] = useState<string>("");
  const [creatorId, setCreatorId] = useState<number>(0);
  const [teamToDos, setTeamtoDos] = useState<TodoInterface[]>([]);
  const [activeUser, setActiveUser] = useState<number>(0);
  const [filterTodos, setFilterTodos] = useState<number>(0);
  const [addTodo, setAddTodo] = useState<{
    title: string;
    description: string;
  }>({
    title: "",
    description: "",
  });

  const handleSetTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddTodo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (activeTab > 0) {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      axios
        .get(`http://localhost:3000/team/${activeTab}`, { headers })
        .then((response) => {
          setUsers(response.data.users);
          setTeamtoDos(response.data.todos);
          setCreatorId(response.data.founder_id);
        })
        .catch((error) => {
          console.error("GET request failed:", error);
        });
    }
  }, [activeTab, accessToken, activeUser, dbMessage]);

  const submitToDo = (e: React.FormEvent) => {
    e.preventDefault();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    axios
      .post(
        `http://localhost:3000/todo`,
        { ...addTodo, teamId: activeTab, private: false },
        { headers }
      )
      .then((response) => {
        console.log(response);
        setAddTodo({ title: "", description: "" });
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };
        axios
          .get(`http://localhost:3000/team/${activeTab}`, { headers })
          .then((response) => {
            setUsers(response.data.users);
            setTeamtoDos(response.data.todos);
          })
          .catch((error) => {
            console.error("GET request failed:", error);
          });
      })
      .catch((error) => {
        console.error("GET request failed:", error);
        setDbMessage(
          error?.response?.data?.message instanceof Array
            ? error.response.data.message.map((err: string) => err)
            : error?.response?.data?.message
        );
      });
  };

  return (
    <div className="todo-list">
      <ListItems
        changeWidth={300}
        team={false}
        placeholderText="Here you can start adding users to your team... Firstly, create a team to be able to start adding users, Once users added, if you are creator of the team you can remove them from the team by clicking 'x' button..."
        id={activeTab}
        setActiveUserState={setActiveUser}
        accessToken={accessToken}
      >
        {users.length > 0 &&
          users.map((user) => (
            <Item
              itemName={user.name}
              id={user.id}
              key={user.id}
              activeTabState={activeUser}
              setActiveTabState={setActiveUser}
              creator={creatorId}
              userId={userId}
              accessToken={accessToken}
              team={false}
              teamId={activeTab}
              setErrorMessageState={setDbMessage}
            />
          ))}
      </ListItems>
      <div className="todos">
        <div>
          {teamToDos.length === 0 && (
            <ToDo
              title="You can create a todo for your team here... You can also see all the team todos, mark as done or not, and delete them. Also you can filter todos by its creators, Submit button will be available when you create or click a team..."
              context=""
              addCloseBtn={false}
            />
          )}
          {teamToDos.map((todo) =>
            filterTodos !== 0 ? (
              todo.creatorId === filterTodos && (
                <ToDo
                  title={todo.title}
                  context={todo.description}
                  key={todo.id}
                  creator={todo.creatorId}
                  currentUser={userId}
                  id={todo.id}
                  accessToken={accessToken}
                  setDbMessagerState={setDbMessage}
                  done={todo.done}
                />
              )
            ) : (
              <ToDo
                title={todo.title}
                context={todo.description}
                key={todo.id}
                creator={todo.creatorId}
                currentUser={userId}
                id={todo.id}
                accessToken={accessToken}
                setDbMessagerState={setDbMessage}
                done={todo.done}
              />
            )
          )}
        </div>

        <form onSubmit={submitToDo}>
          <Input
            label="Title"
            id="title"
            handleChange={handleSetTodo}
            val={addTodo.title}
          />
          <Input
            label="Context"
            id="description"
            handleChange={handleSetTodo}
            val={addTodo.description}
          />
          <Button disabled={activeTab === 0}>Submit</Button>
          <select
            name="filtertodos"
            id="filtertodos"
            value={filterTodos}
            onChange={(e) => setFilterTodos(Number(e.target.value))}
          >
            <option value={0}>No-Filter</option>
            {users.map((user) => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </form>
      </div>
      {dbMessage && (
        <ErrorContainer resetError={() => setDbMessage("")}>
          <ul>
            <li>{dbMessage}</li>
          </ul>
        </ErrorContainer>
      )}
    </div>
  );
};
export default ToDolist;
