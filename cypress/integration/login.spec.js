import LoginPage from "../pages/login.page";
import {dataLoginPage} from "../fixtures/login.data";
import LandingPage from "../pages/landing.page";
import {dataLandingPage} from "../fixtures/landing.data";
import LogoutPage from "../pages/logout.page";
import {dataLogoutPage} from "../fixtures/logout.data";

describe('LOGIN PAGE', () => {
    beforeEach('open login page', () => {
        LoginPage.open();
        LoginPage.verifyPageUrl(dataLoginPage.urlLogin);
        LoginPage.verifyPageHeader(LoginPage.header, dataLoginPage.header);
    })

    it('should successfully login', function () {
        LoginPage.login(dataLoginPage.validUsername, dataLoginPage.validPassword);
        LandingPage.verifyPageUrl(dataLandingPage.urlLandingPage);
        LandingPage.verifyPageHeader(LandingPage.header, dataLandingPage.header);
        LandingPage.logout();
        LogoutPage.verifyPageUrl(dataLogoutPage.urlLogout);
        LogoutPage.verifyPageHeader(LogoutPage.header, dataLogoutPage.header);
    });

    it('should not login with empty fields', function () {
        LoginPage.verifyDisableLoginBtn();
    });

    it('should not login with invalid username', function () {
        LoginPage.login(dataLoginPage.invalidUsername, dataLoginPage.validPassword);
        LoginPage.verifyLoginErrorMessage(dataLoginPage.loginError);
        LoginPage.verifyPageUrl(dataLoginPage.urlLogin);
    });

    it('should not login with invalid password', function () {
        LoginPage.login(dataLoginPage.validUsername, dataLoginPage.invalidPassword);
        LoginPage.verifyLoginErrorMessage(dataLoginPage.loginError);
        LoginPage.verifyPageUrl(dataLoginPage.urlLogin);
    });
})
