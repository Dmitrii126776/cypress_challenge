import BasePage from "./base.page";
import {dataLandingPage} from "../fixtures/landing.data";

class LandingPage extends BasePage {
    get header() {
        return cy.get('h1')
    }

    get avatar() {
        return cy.get('.ngx-dropdown-toggle')
    }

    get buttonLogout() {
        return cy.get('.profile-title > .btn')
    }

    get newRecordBtn() {
        return cy.get('a[data-cy="new-record1__btn"]')
    }

     newRecordClick() {
        this.newRecordBtn.click().should('have.class', 'active');
        cy.url().should('include', dataLandingPage.urlRecordForm);
    }

    logout() {
        this.avatar.click();
        this.buttonLogout.click();
    }
}

export default new LandingPage();
