import React from "react";
import "jest-enzyme";
import {shallow, ShallowWrapper} from "enzyme";

import {Avatar} from "./avatar";

function setup(props = {src: ""}) {
  return shallow(<Avatar {...props} />);
}

function findByTestAttr(wrapper: ShallowWrapper, val: string) {
  return wrapper.find(`[data-test="${val}"]`);
}

describe("Avatar", () => {
  it("should render", () => {
    const wrapper = setup();
    expect(findByTestAttr(wrapper, "component-avatar")).toExist();
  });

  it("should set right src", () => {
    const wrapper = setup({src: ""});
    const component = findByTestAttr(wrapper, "component-avatar");
    console.log(component.text());
  });
});
