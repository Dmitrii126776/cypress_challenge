import BasePage from "./base.page";
import {dataLoginPage} from "../fixtures/login.data";
import {dataRecordApi} from "../fixtures/api.data";
import {dataNewRecord} from "../fixtures/record.data";

class RecordApi extends BasePage {

    get host() {
        return dataRecordApi.host;
    }

    get appId() {
        return dataRecordApi.applicationId;
    }

    apiLogin() {
        cy.request({
            method: 'POST',
            url: `${this.host}/api/user/login`,
            body: {
                username: dataLoginPage.validUsername,
                password: dataLoginPage.validPassword
            }
        }).then((res) => {
            process.env.USER_TOKEN = res.body.token;
            expect(res.status).to.eq(200)
            expect(res).to.have.property('headers')
            expect(res).to.have.property('duration')
            expect(res.statusText).eq('OK')
        })
    }

    createNewRecord() {
        cy.request({
            method: 'POST',
            url: `${this.host}/api/app/${this.appId}/record`,
            headers: {
                'Authorization': 'Bearer ' + `${process.env.USER_TOKEN}`
            },
            body: {
                "applicationId": dataRecordApi.applicationId,
                "values": {
                    "$type": "System.Collections.Generic.Dictionary`2[[System.String, mscorlib],[System.Object, mscorlib]], mscorlib",
                    "56674c5cc6c7dea0aeab4aed": "A new value",
                    aFjm80LnbJf780V6p: dataNewRecord.city,
                    aHdR_gHQmRT8ItVTL: dataNewRecord.firstName,
                    aHxOeHmCTIGd_hg1b: dataNewRecord.lastName,
                    aGgc3qp6gt3dDR_na: dataNewRecord.email
                }
            }
        }).then((res) => {
            expect(res.status).to.eq(200)
            expect(res).to.have.property('headers')
            expect(res).to.have.property('duration')
            expect(res.statusText).eq('OK')
            this.city = res.body.values.aFjm80LnbJf780V6p;
            expect(this.city).eq(dataNewRecord.city)
            this.firstName = res.body.values.aHdR_gHQmRT8ItVTL;
            expect(this.firstName).eq(dataNewRecord.firstName)
            const lastName = res.body.values.aHxOeHmCTIGd_hg1b;
            expect(lastName).eq(dataNewRecord.lastName)
            this.email = res.body.values.aGgc3qp6gt3dDR_na;
            expect(this.email).eq(dataNewRecord.email);
            this.uniqueRecordTracking = res.body.trackingFull
            this.userId = res.body.id;
        })
    }

    getRecordInformation() {
        cy.request({
            method: 'GET',
            url: `${this.host}/api/app/${this.appId}/record/${this.userId}`,
            headers: {
                'Authorization': 'Bearer ' + `${process.env.USER_TOKEN}`
            },
        }).then((res) => {
            expect(res.status).to.eq(200)
            expect(res).to.have.property('headers')
            expect(res).to.have.property('duration')
            expect(res.statusText).eq('OK')
            const city = res.body.values.aFjm80LnbJf780V6p;
            expect(city).eq(this.city)
            const firstName = res.body.values.aHdR_gHQmRT8ItVTL;
            expect(firstName).eq(this.firstName)
            const trackingFull = res.body.trackingFull
            expect(trackingFull).eq(this.uniqueRecordTracking)
            const email = res.body.values.aGgc3qp6gt3dDR_na;
            expect(email).eq(this.email)
        })
    }

    deleteRecord() {
        cy.request({
            method: 'DELETE',
            url: `${this.host}/api/app/${this.appId}/record/${this.userId}`,
            headers: {
                'Authorization': 'Bearer ' + `${process.env.USER_TOKEN}`
            },
        }).then((res) => {
            expect(res.status).eq(204)
            expect(res).to.have.property('duration')
            expect(res).to.have.property('headers')
            expect(res.statusText).eq('No Content')
        })
    }
}

export default new RecordApi();
