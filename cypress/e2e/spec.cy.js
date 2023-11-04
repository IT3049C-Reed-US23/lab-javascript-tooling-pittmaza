describe(`My First Test`, () => {
  it(`Does not do much!`, () => {
    expect(true).to.equal(true);
  });
});

describe(`E2E Test`, () => {
  it(`Types name, makes a choice, and confirms log`, () => {
    cy.visit(`index.html`);
    cy.get(`#username`).type(`Zach`);

    cy.get(`#start-game-button`).click();
    cy.get(`#go-button`).click();

    cy.get(`#score`)
      .invoke("text")
      //I really could not figure out how to reference the .js in the backend
      //I statically assignmend my name in the test case, I recognize
      //this isn't the 'correct' way to implement this, but I've spent a
      //significant amount of time trying to figure this out
      .then((logText) => {
        if (logText.includes("Zach: 0")) {
          cy.get(`#game-history`)
            .invoke("text")
            .then((logText) => {
              expect(logText).to.include("Zach loses");
            });
        } else {
          cy.get(`#game-history`)
            .invoke("text")
            .then((logText) => {
              expect(logText).to.include("Zach wins");
            });
        }
      });
  });
});
