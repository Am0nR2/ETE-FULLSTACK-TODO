import React, {
  ChangeEvent,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import "./listItems.css";
import Button from "./Button";
import Form from "./Form";
import Input from "./Input";
import axios from "axios";
import ErrorContainer from "./ErrorContainer";

interface Props {
  changeWidth?: number;
  changeHeight?: number;
  placeholderText?: string;
  children?: ReactNode;
  id?: number;
  accessToken?: string;
  setActiveTabState?: Dispatch<SetStateAction<number>>;
  team?: boolean;
  setActiveUserState?: Dispatch<SetStateAction<number>>;
  addBtn?: boolean;
}

interface FormValueInterface {
  name?: string;
  add_user?: number;
}
const ListItems: React.FC<Props> = ({
  changeHeight,
  changeWidth,
  placeholderText = "No Items added please click '+' to add",
  children,
  id,
  accessToken,
  setActiveTabState,
  team = true,
  setActiveUserState,
  addBtn = true,
}: Props) => {
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [formValue, setFormValue] = useState<FormValueInterface>({
    name: "",
    add_user: 0,
  });

  const handleIsOpen = () => setFormOpen((prevState) => !prevState);

  const handleFormBtn = () => {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const baseURI = `http://localhost:3000/team/${team ? "" : `${id}`}`;

    const httpMethod = team ? "POST" : "PATCH";

    axios({
      method: httpMethod,
      url: baseURI,
      data: formValue,
      headers: headers,
    })
      .then((response) => {
        setActiveUserState
          ? setActiveUserState(formValue.add_user ? formValue.add_user : 0)
          : {};
        setFormValue({ name: "", add_user: 0 });
        setActiveTabState ? setActiveTabState(response.data.id) : {};
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
        setFormValue({ name: "", add_user: 0 });
      });

    setFormOpen(false);
  };
  const handleResetError = () => setErrorMessage("");
  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFormValue({ [e.target.name]: Number(e.target.value) || e.target.value });

  return (
    <div
      className="list-items"
      style={{ width: `${changeWidth}px`, height: `${changeHeight}px` }}
    >
      {addBtn && (
        <Button handleClick={handleIsOpen} bgcolor="yellow">
          {!formOpen ? "➕" : "❌"}
        </Button>
      )}
      {formOpen && (
        <Form>
          <Input
            label={team ? "Team Name:" : "User Id"}
            id={team ? "name" : "add_user"}
            handleChange={handleFormChange}
            val={team ? formValue.name : formValue.add_user}
            type={team ? "string" : "number"}
          />
          <Button handleClick={handleFormBtn}>{team ? "Create" : "Add"}</Button>
        </Form>
      )}

      {!children ? (
        <div className="item-placeholder">
          <p>{placeholderText}</p>
        </div>
      ) : (
        children
      )}
      {errorMessage && (
        <ErrorContainer resetError={handleResetError}>
          <ul>{errorMessage}</ul>
        </ErrorContainer>
      )}
    </div>
  );
};
export default ListItems;
