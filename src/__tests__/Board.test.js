import { render, screen } from "@testing-library/react";
import Board from "../components/Board";
import { mockPuzzle, mockProgress } from "../utils/testutils";

describe("<Board />", () => {
  it("renders Loading... when no puzzle is supplied", () => {
    render(<Board />);
    const loadingElement = screen.getByText(/Loading.../i);
    expect(loadingElement).toBeInTheDocument();
  });
  it("renders a board with 81 textboxes when puzzle is supplied", () => {
    render(<Board puzzle={mockPuzzle} progress={mockProgress} />);
    const cellElements = screen.getAllByRole("textbox");
    expect(cellElements.length).toEqual(81);
  });
});
