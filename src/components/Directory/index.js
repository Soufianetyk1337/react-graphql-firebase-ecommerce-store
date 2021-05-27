import React from "react";
import shopWomen from "./../../assets/shopWomens.jpg";
import shopMen from "./../../assets/shopMens.jpg";
import "./styles.scss";
function Directory() {
  return (
    <div className="directory">
      <div className="wrap">
        <div
          className="item"
          style={{
            backgroundImage: `url(${shopWomen})`,
          }}
        >
          <a
            href="https://www.google.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Shop Women
          </a>
        </div>
        <div
          className="item"
          style={{
            backgroundImage: `url(${shopMen})`,
          }}
        >
          <a
            href="https://www.google.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Shop Men
          </a>
        </div>
      </div>
    </div>
  );
}

export default Directory;
