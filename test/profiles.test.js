let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../src/app');

let expect = chai.expect;

chai.use(chaiHttp);

describe('GET /profiles', () => {
    describe('Nominal case', () => {
        it('It should return a response with the latest applications versions.', (done) => {
                chai.request(app)
                    .get('/profiles')
                    .set('x-authentication-token', 'token')
                    .set('x-client-id', 'a1:bb:cc:dd:ee:ff')
                    .end((err, res) => {
                        expect(res.status).to.equal(200);
                        expect(res.body).to.have.property('profile');
                        expect(res.body.profile).to.have.property('applications').instanceof(Array).lengthOf(3);
                        expect(res.body.profile.applications[0]).to.have.property('applicationId').eql('music_app');
                        expect(res.body.profile.applications[0]).to.have.property('version').eql('v1.4.10');
                        expect(res.body.profile.applications[1]).to.have.property('applicationId').eql('diagnostic_app');
                        expect(res.body.profile.applications[1]).to.have.property('version').eql('v1.2.6');
                        expect(res.body.profile.applications[2]).to.have.property('applicationId').eql('settings_app');
                        expect(res.body.profile.applications[2]).to.have.property('version').eql('v1.1.5');
                        done();
                    });           
        });
    });

    describe('Client Id is not provided', () => {
        it('It should return a response with status code 401 in case if the client Id is not provided.', (done) => {
                chai.request(app)
                    .get('/profiles')
                    .set('x-authentication-token', 'token')
                    .end((err, res) => {
                        validateInvalidOperationResponse(res, 401, 'Unauthorized');
                        done();
                    });            
        });
    });

    describe('Authentication token is not provided', () => {
        it('It should return a response with status code 401 in case if the Authentication token is not provided.', (done) => {
                chai.request(app)
                    .get('/profiles')
                    .set('x-client-id', 'client Id')
                    .end((err, res) => {
                        validateInvalidOperationResponse(res, 401, 'Unauthorized');
                        done();
                    });            
        });
    });

    describe('Client not found', () => {
        it('It should return a response with status code 404 in case if there is no client with provided Id.', (done) => {
                chai.request(app)
                    .get('/profiles')
                    .set('x-authentication-token', 'token')
                    .set('x-client-id', 'client Id')
                    .end((err, res) => {
                        validateInvalidOperationResponse(res, 404, 'NotFound');
                        done();
                    });            
        });
    });
});

const validateInvalidOperationResponse = (res, statusCode, error) => {
    expect(res.status).to.equal(statusCode);
    expect(res.body).to.have.property('statusCode');
    expect(res.body.statusCode).to.equal(statusCode);
    expect(res.body).to.have.property('error');
    expect(res.body.error).to.equal(error);
    expect(res.body).to.have.property('message');
};