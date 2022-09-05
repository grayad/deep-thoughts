import React from "react";

// this component receives props from Home.js
const ThoughtList = ({ thoughts, title }) => {
  // check if there is data in the thoughts array
  if (!thoughts.length) {
    return <h3>No Thoughts Yet</h3>;
  }

  // if there is data in the thoughts array, return the list of thoughts
  return (
    <div>
      <h3>{title}</h3>
      {thoughts &&
        thoughts.map((thought) => (
          <div key={thought._id} className="card mb-3">
            <p className="card-header">
              {thought.username}
              thought on {thought.createdAt}
            </p>
            <div className="card-body">
              <p>{thought.thoughtText}</p>
              <p className="mb-0">
                Reactions: {thought.reactionCount} || Click to{" "}
                {thought.reactionCount ? "see" : "start"} the discussion!
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ThoughtList;
