import {
  render,
  screen,
  act,
  fireEvent,
  rerender,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Cell from "../components/Cell";
import { mockPuzzle, mockSetProgress, mockProgress } from "../utils/testutils";

describe("<Cell />", () => {
  const row = 0;
  const column = 1;
  const initialValue = mockPuzzle[row][column];
  it("renders value when provided", () => {
    render(
      <Cell
        row={row}
        column={column}
        value={initialValue}
        key={`cell-${row}${column}`}
        disabled={initialValue !== 0}
        setProgress={mockSetProgress}
        progress={mockProgress}
      />
    );
    const cellElement = screen.getByDisplayValue(initialValue);
    expect(cellElement).toBeInTheDocument();
  });
  it("renders empty string no value provided", () => {
    render(
      <Cell
        row={row}
        column={column}
        value={""}
        key={`cell-${row}${column}`}
        disabled={false}
        setProgress={mockSetProgress}
        progress={mockProgress}
      />
    );
    const cellElement = screen.getByDisplayValue("");
    expect(cellElement).toBeInTheDocument();
  });
  it("doesn't update value if new value is invalid", async () => {
    const { container, rerender } = render(
      <Cell
        row={0}
        column={4}
        value={""}
        key={`cell-${row}${column}`}
        disabled={false}
        setProgress={mockSetProgress}
        progress={mockProgress}
      />
    );
    const cellElement = container.firstChild;
    userEvent.type(cellElement, "a");
    rerender(
      <Cell
        row={0}
        column={0}
        value={mockProgress[0][4] === 0 ? "" : mockProgress[0][4]}
        key={`cell-${row}${column}`}
        disabled={false}
        setProgress={mockSetProgress}
        progress={mockProgress}
      />
    );
    expect(cellElement.value).toBe("");
  });
  it("updates value if new value is valid", async () => {
    const { container, rerender } = render(
      <Cell
        row={0}
        column={0}
        value={mockProgress[0][0] === 0 ? "" : mockProgress[0][0]}
        key={`cell-${row}${column}`}
        disabled={false}
        setProgress={mockSetProgress}
        progress={mockProgress}
      />
    );
    const cellElement = container.firstChild;
    userEvent.type(cellElement, "1");
    rerender(
      <Cell
        row={0}
        column={0}
        value={mockProgress[0][0] === 0 ? "" : mockProgress[0][0]}
        key={`cell-${row}${column}`}
        disabled={false}
        setProgress={mockSetProgress}
        progress={mockProgress}
      />
    );
    expect(cellElement.value).toBe("1");
  });

  it("clears the value on backspace", async () => {
    const { container, rerender } = render(
      <Cell
        row={0}
        column={0}
        value={mockProgress[0][0] === 0 ? "" : mockProgress[0][0]}
        key={`cell-${row}${column}`}
        disabled={false}
        setProgress={mockSetProgress}
        progress={mockProgress}
      />
    );
    const cellElement = container.firstChild;
    expect(cellElement.value).toBe("1");
    userEvent.type(cellElement, "{backspace}");
    rerender(
      <Cell
        row={0}
        column={0}
        value={mockProgress[3][0] === 0 ? "" : mockProgress[3][0]}
        key={`cell-${row}${column}`}
        disabled={false}
        setProgress={mockSetProgress}
        progress={mockProgress}
      />
    );
    expect(cellElement.value).toBe("");
  });
});
