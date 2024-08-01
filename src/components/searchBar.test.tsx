import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SearchBar } from "./searchBar";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/components/ui/button", () => ({
  Button: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: any;
  }) => <button {...props}>{children}</button>,
}));

jest.mock("@/components/ui/input", () => ({
  Input: (props: any) => <input {...props} />,
}));

jest.mock("lucide-react", () => ({
  Search: () => <div data-testid="search-icon" />,
  X: () => <div data-testid="clear-icon" />,
}));

describe("SearchBar", () => {
  let mockRouter: { replace: jest.Mock };

  beforeEach(() => {
    mockRouter = {
      replace: jest.fn(),
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it("renders correctly", () => {
    render(<SearchBar />);
    expect(screen.getByTestId("search-bar")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
  });

  it("displays initial search text if provided", () => {
    render(<SearchBar name="initial search" />);
    expect(screen.getByDisplayValue("initial search")).toBeInTheDocument();
  });

  it("updates search text on input change", () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText("Search");
    fireEvent.change(input, { target: { value: "new search" } });
    expect(input).toHaveValue("new search");
  });

  it("calls router.replace with search query on button click", () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText("Search");
    const button = screen.getByRole("button", { name: "Search" });
    fireEvent.change(input, { target: { value: "test search" } });
    fireEvent.click(button);

    expect(mockRouter.replace).toHaveBeenCalledWith("/?name=test search");
  });

  it("calls router.replace with search query on Enter key press", () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText("Search");

    fireEvent.change(input, { target: { value: "test search" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(mockRouter.replace).toHaveBeenCalledWith("/?search=test search");
  });

  it("displays clear icon when search text is present", () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText("Search");

    fireEvent.change(input, { target: { value: "test" } });
    expect(screen.getByTestId("clear-icon")).toBeInTheDocument();
  });
});
