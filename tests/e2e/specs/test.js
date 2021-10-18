// https://docs.cypress.io/api/introduction/api.html

describe("My First Test", () => {
  it("Visits the app root url", () => {
    cy.visit("/");
    cy.contains("h1", "Where in the world");
  });
  it("Visit country inner page", () => {
    let ahref = "";
    cy.get("#app > div > div > div > div:nth-child(2) > div:nth-child(1)")
      .find("a")
      .then(($atag) => {
        ahref = $atag.attr("href");
      });
    cy.get("#app > div > div > div > div:nth-child(2) > div:nth-child(1)")
      .find("a")
      .click();
    cy.url().should("contain", ahref);
  });
  it("Check theme toggle", () => {
    cy.get("#themeChanger").click();
    cy.get("#themeChanger")
      .get("span")
      .then(($span) => {
        let text = $span.text();
        if (text === "light mode") {
          cy.get("body").hasClass("theme-dark");
        }
        if (text === "dark mode") {
          cy.get("body").hasClass("theme-light");
        }
      });
  });
  it("Check back link", () => {
    cy.get("#backLink").click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/");
    });
  });
});
