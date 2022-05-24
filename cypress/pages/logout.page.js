import BasePage from "./base.page";

class LogoutPage extends BasePage {
    get header() {
        return cy.get('h1[data-cy="logout__msg"]')
    }
}

export default new LogoutPage();
