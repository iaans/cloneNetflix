import React from "react";
import "./MovieRow.css";

export default ({ title, items }) => {
  console.log(items);
  return (
    <div className="movieRow">
      <h2>{title}</h2>

      <div className="movieRow--listarea">
        <div className="movieRow--list">
          {items.results &&
            items.results.length > 0 &&
            items.results.map((item, key) => (
              <div key={key} className="movieRow--item">
                <img
                  src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                  alt={item.original_t}
                />{" "}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
