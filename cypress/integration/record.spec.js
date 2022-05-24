import LoginPage from "../pages/login.page";
import {dataLoginPage} from "../fixtures/login.data";
import LandingPage from "../pages/landing.page";
import {dataLandingPage} from "../fixtures/landing.data";
import RecordPage from "../pages/record.page";

describe('NEW RECORD PAGE', () => {
    beforeEach('open login page', () => {
        LoginPage.open();
        LoginPage.verifyPageUrl(dataLoginPage.urlLogin);
        LoginPage.login(dataLoginPage.validUsername, dataLoginPage.validPassword);
        LandingPage.verifyPageUrl(dataLandingPage.urlLandingPage);
    });

    it('should create new record', function () {
        LandingPage.newRecordClick();
        RecordPage.newRecordCreate();
        RecordPage.saveNewRecord();
        RecordPage.verifyNewRecordInformation();
    });
})
