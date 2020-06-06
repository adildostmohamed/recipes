import React, { useState, useReducer } from "react";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface ILoginFormState {
  email: string;
  password: string;
}

interface IAction {
  type: string;
  payload: string;
}

const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
    }
  }
`;

const initialLoginFormState = {
  email: "",
  password: "",
};

const reducer = (state: ILoginFormState, action: IAction) => {
  return {
    ...state,
    [action.type]: action.payload,
  };
};

const LoginRoute = () => {
  const [loginFormState, dispatch] = useReducer(reducer, initialLoginFormState);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const history = useHistory();
  const [
    login,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(LOGIN, {
    onCompleted: (data) => {
      const { token } = data.login;
      handleLoginSuccess(token);
    },
  });

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: e.target.name, payload: e.target.value });
  };

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login({ variables: { input: loginFormState } });
    } catch (e) {
      console.error(e);
    }
  };

  const onShowPasswordClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ): void => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleLoginSuccess = (token: string) => {
    localStorage.setItem("token", token);
    history.push("/profile");
  };

  const { email, password } = loginFormState;

  return (
    <div className="columns is-centered">
      <div className="column is-one-quarter">
        {mutationError && (
          <div className="message is-danger">
            <div className="message-body">
              Error logging in, please try again
            </div>
          </div>
        )}
        <form onSubmit={onSubmit}>
          <div className="field">
            <label htmlFor="email" className="label">
              Email
            </label>
            <div className="control">
              <input
                className="input"
                id="email"
                name="email"
                type="text"
                onChange={onInputChange}
                value={email}
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="password" className="label">
              Password
            </label>
            <div className="control">
              <input
                className="input"
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                onChange={onInputChange}
                value={password}
              />
              <button
                className="show-password__btn"
                onClick={onShowPasswordClick}
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
          </div>
          <button
            className="button is-fullwidth is-primary"
            type="submit"
            disabled={mutationLoading}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginRoute;
