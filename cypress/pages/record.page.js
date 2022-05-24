import BasePage from "./base.page";
import {dataNewRecord} from "../fixtures/record.data";

class RecordPage extends BasePage {
    get firstName() {
        return cy.get('input[name="aHdR_gHQmRT8ItVTL"]')
    }

    get lastName() {
        return cy.get('input[name="aHxOeHmCTIGd_hg1b"]')
    }

    get streetAddress() {
        return cy.get('textarea[name="aJDBDjjIFiTemxLGc"]')
    }

    get city() {
        return cy.get('input[name="aFjm80LnbJf780V6p"]')
    }

    get state() {
        return cy.get('input[name="aIaHwVkkr_seOK096"]')
    }

    get phone() {
        return cy.get('input[name="aJX7sLD3xZH9TlVps"]')
    }

    get zip() {
        return cy.get('input[name="aKTyoAgO27gfZC0Vd"]')
    }

    get email() {
        return cy.get('input[name="aGgc3qp6gt3dDR_na"]')
    }

    get saveBtn() {
        return cy.get('.save-button > [ng-if="!getInProgressState(tool)"] > .text')
    }

    get saveModalBtn() {
        return cy.get('.modal-footer > .btn');
    }

    get status() {
        return cy.get('input[name="aIuEa7EWYrg958AiM"]')
    }

    get department() {
        return cy.get('input[name="aGMfQEKK_1G7WdqEK"]')
    }

    get benefits() {
        return cy.get('input[name="aFPpUOs0uSrcRCKYZ"]')
    }

    get recordHeaderLink() {
        return cy.get('.record-header-link')
    }

    newRecordCreate() {
        this.firstName.type(dataNewRecord.firstName).should('have.value', dataNewRecord.firstName);
        this.lastName.type(dataNewRecord.lastName).should('have.value', dataNewRecord.lastName);
        this.streetAddress.type(dataNewRecord.streetAddress).should('have.value', dataNewRecord.streetAddress);
        this.city.type(dataNewRecord.city).should('have.value', dataNewRecord.city);
        this.state.type(dataNewRecord.state).should('have.value', dataNewRecord.state);
        this.phone.type(dataNewRecord.phone).should('have.value', dataNewRecord.phone);
        this.zip.type(dataNewRecord.zip).should('have.value', dataNewRecord.zip);
        this.email.type(dataNewRecord.email).should('have.value', dataNewRecord.email);
        this.status.first().click();
        this.department.first().click();
        this.benefits.first().click();
    }

    saveNewRecord() {
        this.saveBtn.click();
        this.saveModalBtn.click();
    }


    verifyNewRecordInformation() {
        cy.intercept({method: 'GET', url: '**history?**'}).as('information')
        cy.wait('@information')
        cy.get('@information').should('not.be.null').then(({response}) => {
            const firstName = response.body[0].version.values.aHdR_gHQmRT8ItVTL;
            const lastName = response.body[0].version.values.aHxOeHmCTIGd_hg1b;
            const city = response.body[0].version.values.aFjm80LnbJf780V6p;
            const zip = response.body[0].version.values.aKTyoAgO27gfZC0Vd;
            const recordHeader = response.body[0].version.trackingFull;
            this.firstName.should('have.value', `${firstName}`)
            this.lastName.should('have.value', `${lastName}`)
            this.city.should('have.value', `${city}`)
            this.zip.should('have.value', `${zip}`)
            this.recordHeaderLink.contains(`${recordHeader}`)
        })
    }
}

export default new RecordPage();
