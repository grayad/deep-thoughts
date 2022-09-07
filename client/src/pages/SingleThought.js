// modules
import React from "react";
import { useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { QUERY_THOUGHT } from "../utils/queries";

// reaction component
import ReactionList from "../components/ReactionList";

const SingleThought = (props) => {
  const { id: thoughtId } = useParams();

  // query for the single though selected
  const { loading, data } = useQuery(QUERY_THOUGHT, {
    variables: { id: thoughtId },
  });

  const thought = data?.thought || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  // return JSX
  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {thought.username}
          </span>{" "}
          thought on {thought.createdAt}
        </p>
        <div className="card-body">
          <p>{thought.thoughtText}</p>
        </div>
      </div>

      {/* reaction component, passing reactions array as a prop */}
      {thought.reactionCount > 0 && (
        <ReactionList reactions={thought.reactions} />
      )}
    </div>
  );
};

export default SingleThought;
