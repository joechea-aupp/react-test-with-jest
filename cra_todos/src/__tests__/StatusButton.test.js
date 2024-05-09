import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import StatusButton from "../components/StatusButton";

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

describe("Testing StatusButton component", () => {
  it("Returns true when the status prop is false", async () => {
    const onDoneFn = jest.fn();

    await act(async () => {
      render(<StatusButton status={false} onDone={onDoneFn} />, div);
    });

    const statusBtn = document.querySelector(".status-btn");

    await act(async () => {
      await Simulate.click(statusBtn);
    });

    expect(statusBtn.className).toBe("status-btn");
    expect(onDoneFn).toBeCalledWith(true);
  });

  it("Returns false when the status prop is true", async () => {
    const onDoneFn = jest.fn();

    await act(async () => {
      render(<StatusButton status={true} onDone={onDoneFn} />, div);
    });

    const statusBtn = document.querySelector(".status-btn");

    await act(async () => {
      await Simulate.click(statusBtn);
    });

    expect(statusBtn.className).toBe("status-btn status-done");
    expect(onDoneFn).toBeCalledWith(false);
  });
});
