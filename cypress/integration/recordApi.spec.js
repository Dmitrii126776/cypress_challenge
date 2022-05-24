import RecordApiPage from "../pages/recordApi.page";

describe('API REQUESTS', () => {
    it('should login and get user token', function () {
        RecordApiPage.apiLogin();
    });

    it('should create new record', function () {
        RecordApiPage.createNewRecord();
    });

    it('should get user information', function () {
        RecordApiPage.getRecordInformation();
    });

    it('should delete user record', function () {
        RecordApiPage.deleteRecord();
    });
})
