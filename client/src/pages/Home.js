import React from "react";

import { useQuery } from "@apollo/client";
import { QUERY_THOUGHTS } from "../utils/queries";

import ThoughtList from "../components/ThoughtList";

const Home = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_THOUGHTS);

  const thoughts = data?.thoughts || [];
  console.log(thoughts);

  return (
    <main>
      <div className="flex-row justify-space-between">
        <div className="col-12 mb-3">
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
      </div>
    </main>
  );
};

export default Home;
