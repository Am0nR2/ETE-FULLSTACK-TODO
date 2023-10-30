import { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import "./login-register.css";
import axios from "axios";
import ErrorContainer from "./ErrorContainer";
interface Props {
  errorMessageState: string;
  setErrorMessageState: (any: string) => void;
  setAccessTokenState: (any: string) => void;
}
const Login = ({
  errorMessageState,
  setErrorMessageState,
  setAccessTokenState,
}: Props) => {
  const [login, setLogin] = useState<boolean>(false);
  const [logRegData, setLogRegData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const isError = errorMessageState;
  const baseURI = `http://localhost:3000/auth/${login ? "login" : "register"}`;

  const handleLogReg = (e: React.ChangeEvent<HTMLInputElement>) =>
    setLogRegData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  const resetError = () => setErrorMessageState("");

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    axios
      .post(baseURI, logRegData)
      .then((response) => {
        console.log(response.data);
        JSON.stringify(
          localStorage.setItem("accessToken", response.data.access_token)
        );
        setAccessTokenState(localStorage.getItem("accessToken") || "");
      })
      .catch((error) => {
        console.log(error.response.data.message);
        setErrorMessageState(
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
    <div className="login-register">
      <div className="login-register-btns">
        <h3 onClick={() => setLogin(true)}>login</h3>
        <h3 onClick={() => setLogin(false)}>register</h3>
      </div>
      {!login ? (
        <>
          <Input
            label="User Name"
            id="name"
            handleChange={handleLogReg}
            val={logRegData.name}
          />
          <Input
            label="E-mail"
            id="email"
            handleChange={handleLogReg}
            val={logRegData.email}
          />
          <Input
            label="Password"
            id="password"
            type="password"
            handleChange={handleLogReg}
            val={logRegData.password}
          />
        </>
      ) : (
        <>
          <Input
            label="E-mail"
            id="email"
            handleChange={handleLogReg}
            val={logRegData.email}
          />
          <Input
            label="Password"
            type="password"
            id="password"
            handleChange={handleLogReg}
            val={logRegData.password}
          />
        </>
      )}
      <Button handleClick={handleSubmit} bgcolor="Orange" color="black">
        {login ? "Login" : "Register"}
      </Button>
      {isError && (
        <ErrorContainer resetError={resetError}>
          <ul>{errorMessageState}</ul>
        </ErrorContainer>
      )}
    </div>
  );
};
export default Login;
