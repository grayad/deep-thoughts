import React from "react";

import { useQuery } from "@apollo/client";
import { QUERY_THOUGHTS, QUERY_ME_BASIC } from "../utils/queries";

// components
import ThoughtList from "../components/ThoughtList";
import FriendList from "../components/FriendList";

import Auth from "../utils/auth";

const Home = () => {
  // if logged in, the variable will equal true
  const loggedIn = Auth.loggedIn();

  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  // use object destructuring to extract `data` from the `useQuery` Hook's response and rename it `userData` to be more descriptive
  const { data: userData } = useQuery(QUERY_ME_BASIC);

  const thoughts = data?.thoughts || [];
  console.log(thoughts);

  return (
    <main>
      <div className="flex-row justify-space-between">
        {/* if the user is logged in, it'll only span eight columns, leaving space for a four-column <div> on the righthand side for friendsList */}
        <div className={`col-12 mb-3 ${loggedIn && "col-lg-8"}`}>
          {/* if query is still in progress, display a loading message */}
          {loading ? (
            <div>Loading...</div>
          ) : (
            // when the query is complete, pass the thoughts array as props to ThoughtList component
            <ThoughtList
              thoughts={thoughts}
              title="Some Feed for Thought(s)..."
            />
          )}
        </div>
        {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3">
            <FriendList
              username={userData.me.username}
              friendCount={userData.me.friendCount}
              friends={userData.me.friends}
            />
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default Home;
