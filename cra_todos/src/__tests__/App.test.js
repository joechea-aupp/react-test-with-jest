import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import App from "../App";

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

jest.mock("../services", () => {
  return {
    getToDos: () =>
      Promise.resolve([
        {
          title: "Book concert tickets",
          done: false,
          id: 1
        },
        {
          title: "Buy a new iPhone",
          done: true,
          id: 2
        },
        {
          title: "Write an article on React",
          done: true,
          id: 3
        }
      ]),
    addTodo: obj => Promise.resolve({ ...obj, id: 4 })
  };
});

describe("Testing the App", () => {
  it("Renders a snapshot successfully", async () => {
    await act(async () => {
      render(<App />, div);
    });

    expect(div.innerHTML).toMatchSnapshot();
  });

  it("Add task function works", async () => {
    await act(async () => {
      render(<App />, div);
    });

    const inputFld = document.querySelector(".add-todo > input");

    await act(async () => {
      await Simulate.change(inputFld, {
        target: { value: "This is a test task" }
      });
      await Simulate.keyUp(inputFld, { key: "Enter", keyCode: 13 });
    });

    expect(div.innerHTML).toMatchSnapshot();
  });
});
