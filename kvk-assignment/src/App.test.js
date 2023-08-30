import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import App from "./App";

test("renders search field", () => {
  const { container } = render(<App />);
  const searchInput = container.getElementsByClassName("querybox")[0];
  expect(searchInput).toBeInTheDocument();
});

test("get search result", async () => {
  const { container } = render(<App />);
  const searchInput = container.getElementsByClassName("querybox")[0];

  fireEvent.change(searchInput, { target: { value: "Wintheiser" } });

  // expect the input value to be updated
  expect(searchInput.value).toBe("Wintheiser");

  // expect a result for this query
  await waitFor(
    () => {
      expect(screen.getByText("Wintheiser Group"));
    },
    { timeout: 3000 },
  );
});
