import { Button } from "../../Styles/Button.style";
import React from "react";

function MoreIems({ showMoreItems }) {
  return (
    <div className="product__loader">
      <Button
        bgColor="light-grey"
        padding="10px"
        borderRadius="6px"
        onClick={showMoreItems}
      >
        More Items
      </Button>
    </div>
  );
}

export default MoreIems;
