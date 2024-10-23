// __tests__/App-test.js
import React from "react";
import renderer from "react-test-renderer";
import App from "../App";

it("renders correctly", () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
