import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import ListItems from "./components/ListItems";
import ToDolist from "./components/ToDolist";
import axios from "axios";
import { CurrentUser, Team, ToDoMeInterface } from "./interfaces";
import Item from "./components/Item";
import ToDo from "./components/ToDo";
import Input from "./components/Input";
import Button from "./components/Button";
import ErrorContainer from "./components/ErrorContainer";
import Me from "./components/Me";

function App() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [accessToken, setAccessToken] = useState<string>(
    localStorage.getItem("accessToken") || ""
  );
  const [teams, setTeams] = useState<Team[]>([]);
  const [user, setUser] = useState<CurrentUser>();
  const [reqSuccess, setReqSuccess] = useState<boolean>(false);
  const [todos, setTodos] = useState<ToDoMeInterface[]>([]);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [privateTodo, setPrivateTodo] = useState<{
    title: string;
    description: string;
  }>({
    title: "",
    description: "",
  });
  const [meTab, setMeTab] = useState<boolean>(false);

  const userId = user?.id || 0;

  useEffect(() => {
    if (accessToken) {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      axios
        .get("http://localhost:3000/auth/me", { headers })
        .then((response) => {
          setTeams(response.data.teams);
          setTodos(response.data.todos);
          setUser(response.data);
        })
        .catch((error) => {
          console.error("GET request failed:", error);
        });
    }
  }, [activeTab, accessToken, reqSuccess, errorMessage]);

  const handleSetPrivateTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrivateTodo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitPrivateTodo = (e: React.FormEvent) => {
    e.preventDefault();

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    axios
      .post(
        "http://localhost:3000/todo",
        { ...privateTodo, private: true },
        { headers }
      )
      .then(() => {
        setReqSuccess((prevState) => !prevState);
        setPrivateTodo({ title: "", description: "" });
      })
      .catch((error) => {
        setErrorMessage(
          error?.response?.data?.message instanceof Array ? (
            error.response.data.message.map((err: string) => (
              <li key={err}>{err}</li>
            ))
          ) : (
            <li>{error?.response?.data?.message}</li>
          )
        );
      });
  };

  return (
    <>
      {accessToken ? (
        <>
          <Navbar
            handleSetAccessToken={setAccessToken}
            handleSetTeams={setTeams}
            handleSetTodos={setTodos}
            setMeTab={setMeTab}
            hanldeSetActiveTab={setActiveTab}
          />
          <main>
            {user && meTab && (
              <Me username={user.name} email={user.email} setMeTab={setMeTab} />
            )}
            {!meTab && (
              <>
                <ListItems
                  setActiveTabState={setActiveTab}
                  accessToken={accessToken}
                  placeholderText="Opps, It seems you are not currently evolved any team... Click `+` to create teams, Once the teams are created if you are the founder of the team, you can remove them by just clicking 'X' button ..."
                >
                  {teams.length > 0 &&
                    teams.map((team) => (
                      <Item
                        itemName={team.name}
                        id={team.id}
                        key={team.id}
                        setActiveTabState={setActiveTab}
                        activeTabState={activeTab}
                        userId={userId}
                        creator={team.founder_id}
                        accessToken={accessToken}
                        setErrorMessageState={setErrorMessage}
                      />
                    ))}
                </ListItems>
                <ToDolist
                  accessToken={accessToken}
                  activeTab={activeTab}
                  userId={userId}
                />
                <ListItems
                  placeholderText="You do not have any personal toDo Items click + to start adding..."
                  addBtn={false}
                >
                  <div className="todo-main">
                    <div className="todos">
                      <div>
                        {todos.filter((todo) => todo.teamId === null).length ===
                          0 && (
                          <ToDo
                            title="You can create private todos here... and you can see all of your Private Todos... Only you can see your private todos and only you can edit them..."
                            context=""
                            addCloseBtn={false}
                          />
                        )}
                        {todos.map((todo) =>
                          todo.teamId === null ? (
                            <ToDo
                              title={todo.title}
                              context={todo.description}
                              key={todo.id}
                              creator={todo.creatorId}
                              currentUser={userId}
                              id={todo.id}
                              accessToken={accessToken}
                              setDbMessagerState={setErrorMessage}
                              done={todo.done}
                            />
                          ) : (
                            ""
                          )
                        )}
                      </div>
                      <form onSubmit={handleSubmitPrivateTodo}>
                        <Input
                          label="Title"
                          id="title"
                          val={privateTodo.title}
                          handleChange={handleSetPrivateTodo}
                        />
                        <Input
                          label="Context"
                          id="description"
                          val={privateTodo.description}
                          handleChange={handleSetPrivateTodo}
                        />
                        <Button>Submit</Button>
                      </form>
                    </div>
                  </div>
                </ListItems>
              </>
            )}
            {errorMessage && (
              <ErrorContainer resetError={() => setErrorMessage("")}>
                <ul>
                  <li>{errorMessage}</li>
                </ul>
              </ErrorContainer>
            )}
          </main>
        </>
      ) : (
        <Login
          errorMessageState={errorMessage}
          setErrorMessageState={setErrorMessage}
          setAccessTokenState={setAccessToken}
        />
      )}
    </>
  );
}

export default App;
