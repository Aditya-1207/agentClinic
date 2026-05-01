import { describe, it, expect } from "vitest";
import { renderHeader } from "./header";
import { renderFooter } from "./footer";
import { renderHomePage } from "./home";
import { renderLayout } from "./layout";

describe("View rendering functions", () => {
  it("renderHeader should return a header element with the site name", () => {
    const html = renderHeader();
    expect(html).toContain("<header>");
    expect(html).toContain('<span class="site-name">AgentClinic</span>');
    expect(html).toContain("</header>");
  });

  it("renderFooter should return a footer with the current year", () => {
    const html = renderFooter();
    const currentYear = new Date().getFullYear();
    expect(html).toContain("<footer>");
    expect(html).toContain(currentYear.toString());
    expect(html).toContain("</footer>");
  });

  it("renderHomePage should return the home page content", () => {
    const html = renderHomePage();
    expect(html).toContain('<div class="home">');
    expect(html).toContain("Welcome to AgentClinic");
  });

  it("renderLayout should wrap content in a full HTML document", () => {
    const content = "<p>Test Content</p>";
    const title = "Test Title";
    const html = renderLayout(title, content);
    
    expect(html).toContain("<!DOCTYPE html>");
    expect(html).toContain(`<title>${title}</title>`);
    expect(html).toContain(content);
    expect(html).toContain("<header>"); // ensures header is rendered
    expect(html).toContain("<footer>"); // ensures footer is rendered
  });
});
