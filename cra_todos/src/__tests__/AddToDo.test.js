import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import AddToDo from "../components/AddToDo";

let div = null;

beforeEach(() => {
  div = document.createElement("div");
  document.body.appendChild(div);
});

afterEach(() => {
  unmountComponentAtNode(div);
  div.remove();
  div = null;
});

describe("Testing AddToDo.js component", () => {
  it("Returns the contents of the input field using the onAdd prop", async () => {
    const onAddFn = jest.fn();
    await act(async () => {
      render(<AddToDo onAdd={onAddFn} />, div);
    });

    const inputFld = document.querySelector("input");

    await act(async () => {
      await Simulate.change(inputFld, {
        target: { value: "This is a test task" }
      });
      await Simulate.keyUp(inputFld, { key: "Enter", keyCode: 13 });
    });

    expect(inputFld.value).toBe("");

    expect(onAddFn).toBeCalledWith({
      done: false,
      title: "This is a test task"
    });
  });
});
