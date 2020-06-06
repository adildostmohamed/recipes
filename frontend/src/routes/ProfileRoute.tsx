import React from "react";
import { useHistory } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

const GET_CURRENT_USER = gql`
  {
    currentUser {
      id
      firstName
      lastName
      email
    }
  }
`;

const ProfileRoute = () => {
  const history = useHistory();
  const { data } = useQuery(GET_CURRENT_USER, {
    onError: () => {
      history.push("/login");
    },
  });
  return (
    <div>
      <pre>{JSON.stringify(data)}</pre>
    </div>
  );
};

export default ProfileRoute;
