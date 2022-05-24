import BasePage from "./base.page";

class LoginPage extends BasePage {
    get header() {
        return cy.get('h1[data-cy="welcome__message"]')
    }

    get inputUsername() {
        return cy.get('#input-1')
    }

    get inputPassword() {
        return cy.get('#input-2')
    }

    get buttonLogin() {
        return cy.get('.btn-signin')
    }

    get loginErrorMessage() {
        return cy.get('.login-error')
    }

    verifyDisableLoginBtn() {
        this.buttonLogin.should('be.disabled');
    }

    verifyLoginPage(urlLogin, header) {
        cy.url().should('include', urlLogin);
        this.header.should('be.visible').contains(header);
    }

    verifyLoginErrorMessage(text) {
        this.loginErrorMessage.should('be.visible').contains(text);
    }

    login(email, password) {
        this.inputUsername.type(email);
        this.inputPassword.type(password);
        this.buttonLogin.click();
    }

    open() {
        return super.open('/');
    }
}

export default new LoginPage();
