export default class BasePage {

    verifyPageUrl(endPoint) {
        cy.url().should('include', endPoint);
    }

    verifyPageHeader(selector, header) {
        selector.should('be.visible').contains(header);
    }

    open(path) {
        cy.viewport(1280, 720);
        return cy.visit(path);
    }
}
