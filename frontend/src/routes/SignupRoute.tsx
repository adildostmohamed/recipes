import React, { useState, useReducer } from "react";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface ISignupFormState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface IAction {
  type: string;
  payload: string;
}

const SIGNUP = gql`
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      token
    }
  }
`;

const initialSignUpFormState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const reducer = (state: ISignupFormState, action: IAction) => {
  return {
    ...state,
    [action.type]: action.payload,
  };
};

const SignupRoute = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [signupFormState, dispatch] = useReducer(
    reducer,
    initialSignUpFormState
  );
  const history = useHistory();
  const [
    signup,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(SIGNUP, {
    onCompleted: (data) => {
      const { token } = data.signup;
      handleSignupSuccess(token);
    },
  });

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: e.target.name, payload: e.target.value });
  };

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signup({ variables: { input: signupFormState } });
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

  const handleSignupSuccess = (token: string) => {
    localStorage.setItem("token", token);
    history.push("/profile");
  };

  const { firstName, lastName, email, password } = signupFormState;

  return (
    <div className="columns is-centered">
      <div className="column is-one-quarter">
        {mutationError && (
          <div className="message is-danger">
            <div className="message-body">
              Error signing up, please try again
            </div>
          </div>
        )}
        <form onSubmit={onSubmit}>
          <div className="field">
            <label htmlFor="firstName" className="label">
              First name
            </label>
            <div className="control">
              <input
                className="input"
                id="firstName"
                name="firstName"
                type="text"
                onChange={onInputChange}
                value={firstName}
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="firstName" className="label">
              Last name
            </label>
            <div className="control">
              <input
                className="input"
                id="lastName"
                name="lastName"
                type="text"
                onChange={onInputChange}
                value={lastName}
              />
            </div>
          </div>
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

export default SignupRoute;
