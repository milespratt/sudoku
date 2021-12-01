import { render, screen, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../components/App";
import { mockPuzzleResponse } from "../utils/testutils";

// mock fetch and provide mock response
beforeAll(() => {
  global.fetch = () =>
    Promise.resolve({
      json: () => Promise.resolve(mockPuzzleResponse),
    });
});

describe("<App />", () => {
  it("fetches a new puzzle on load", async () => {
    await act(async () => render(<App />));
    expect(screen.getAllByDisplayValue("6").length).toBe(4);
  });

  it("changes difficulty when buttons are clicked", async () => {
    await act(async () => render(<App />));
    const randomButton = screen.getByText("Random");
    const easyButton = screen.getByText("Easy");
    const mediumButton = screen.getByText("Medium");
    const hardButton = screen.getByText("Hard");
    await act(async () => {
      userEvent.click(randomButton);
    });
    await act(async () => {
      userEvent.click(easyButton);
    });
    expect(screen.getByText("Difficulty: Easy")).toBeInTheDocument();
    await act(async () => {
      userEvent.click(mediumButton);
    });
    expect(screen.getByText("Difficulty: Medium")).toBeInTheDocument();
    await act(async () => {
      userEvent.click(hardButton);
    });
    expect(screen.getByText("Difficulty: Hard")).toBeInTheDocument();
  });

  it("resets when clicking reset", async () => {
    await act(async () => render(<App />));
    const clearButton = screen.getByText("Reset");
    await act(async () => {
      userEvent.click(clearButton);
    });
  });

  it("displays broken when validating incorrect puzzle", async () => {
    await act(async () => render(<App />));
    const validateButton = screen.getByText("Validate");
    await act(async () => {
      userEvent.click(validateButton);
    });
    expect(screen.getByText("Status: Broken")).toBeInTheDocument();
  });

  it("solves the puzzle when clicking solve", async () => {
    await act(async () => render(<App />));
    const solveButton = screen.getByText("Solve");
    userEvent.click(solveButton);
    expect(screen.getByText("Status: Solved")).toBeInTheDocument();
  });

  it("displays solved when validating correct puzzle", async () => {
    await act(async () => render(<App />));
    const validateButton = screen.getByText("Validate");
    const solveButton = screen.getByText("Solve");
    await act(async () => {
      userEvent.click(solveButton);
    });
    userEvent.click(validateButton);
    expect(screen.getByText("Status: Solved")).toBeInTheDocument();
  });
});
