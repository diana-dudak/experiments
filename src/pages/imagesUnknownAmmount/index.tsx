import React from "react";
import Page from "../../shared/Page";
import "./index.scss";

import list from "./images/list.json";

const ImagesUnknownAmmount = () => {
  return (
    <Page>
      <h1>Images Test</h1>
      <div className="ImagesUnknownAmmount">
        {list.map((item) => (
          <div className="ImagesUnknownAmmount__img" key={item.name}>
            <p>{item.name}</p>
            <img src={require(`./images/${item.name}`)} alt="" />
          </div>
        ))}
      </div>
    </Page>
  );
};

export default ImagesUnknownAmmount;
