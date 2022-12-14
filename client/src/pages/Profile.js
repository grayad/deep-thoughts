import React from "react";

import Auth from "../utils/auth";

import { Navigate, useParams } from "react-router-dom";

// components
import ThoughtList from "../components/ThoughtList";
import FriendList from "../components/FriendList";

// to query for the user
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";

const Profile = () => {
  const { username: userParam } = useParams();

  // query user
  const { loading, data } = useQuery(QUERY_USER, {
    variables: { username: userParam },
  });

  // variable for user data, if any
  const user = data?.user || {};

  // navigate to personal profile page if username is the logged-in user's
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this page. Use the navigation links
        above to sign up or log in!
      </h4>
    );
  }

  // to return JSX
  return (
    <div>
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          Viewing {userParam ? `${user.username}'s` : "your"} profile.
        </h2>
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          <ThoughtList
            thoughts={user.thoughts}
            title={`${user.username}'s thoughts...`}
          />
        </div>
        <div className="col-12 col-lg-3 mb-3">
          <FriendList
            username={user.username}
            friendCount={user.friendCount}
            friends={user.friends}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
