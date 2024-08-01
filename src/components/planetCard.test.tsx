import { render, screen } from "@testing-library/react";
import { PlanetCard } from "./planetCard";

describe("PlanetCard", () => {
  const defaultProps = {
    width: 300,
    height: 200,
    planet: { name: "Tatooine" },
  };

  it("renders a planet card", () => {
    render(<PlanetCard {...defaultProps} />);
  });
});
