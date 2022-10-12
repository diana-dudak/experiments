import React from "react";
import Page from "../../shared/Page";
import "./index.scss"

const DevProdMode = () => {
  return (
    <Page>
      <h1>Dev/Prod Mode</h1>
      <code>
        Current mode is: <b>{process.env.NODE_ENV}</b>
      </code>

      <table className="DevProdMode__table">
        <thead>
          <tr>
            <td>command</td>
            <td>expected mode</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>run npm start</td>
            <td>development</td>
          </tr>
          <tr>
            <td>run npm test</td>
            <td>test</td>
          </tr>
          <tr>
            <td>run npm build</td>
            <td>production</td>
          </tr>
        </tbody>
      </table>
    </Page>
  );
};

export default DevProdMode;
