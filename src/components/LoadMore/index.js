import React from "react";
import Button from "../Forms/Button";

function LoadMore({ onLoadMore = () => {} }) {
  return (
    <div>
      <Button onClick={() => onLoadMore()}>Load More</Button>
    </div>
  );
}

export default LoadMore;
