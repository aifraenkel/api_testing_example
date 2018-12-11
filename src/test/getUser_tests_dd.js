require('dotenv').config('./.env');

if(process.env.MODE=='regression')
    require("mocha-allure-reporter");

var fs = require('fs');
var assert = require('assert');
var supertest = require('supertest');

var itParam = require('mocha-param');
var helper = require('../lib/helpers');

var api = supertest.agent(process.env.API_URL);

//var cert = fs.readFileSync(process.env.USER_CERT_PATH);
//var key = fs.readFileSync(process.env.USER_KEY_PATH);
//var ca = fs.readFileSync(process.env.CA_CERT_PATH);

var datapool = JSON.parse(fs.readFileSync(process.env.API_GETUSERS_DATAPOOL));
var results_path = './_output/results_users.csv';

describe('Example API - GetUser - Datadriven test', function () {
        itParam('USER_ID :: ${value.id} ', datapool.users, function (done, value) {
            var payload = ' ';

            api.get('/api/users/' + value.id)
                //.key(key)
                //.cert(cert)
                //.ca(ca)
                //.set('Accept', 'application/x-www-form-urlencoded')
                //.send(payload)
                //.expect("Content-type",/json/)
                .expect(200)
                .end(function(err, res){
                    if(err)
                    {
                        console.log(err);
                        done();
                    }    
                    var result = JSON.parse(res.text);
                    
                    if(process.env.MODE=='regression') {
                        allure.createAttachment('request /api/users/' + value.id ,JSON.stringify(payload));
                        allure.createAttachment('response /api/users/' + value.id,JSON.stringify(result));
                    } 
                    if(process.env.MODE=='debug') {
                        console.log('REQUEST BODY: ' + JSON.stringify(payload));
                        console.log('RESPONSE BODY: ' + JSON.stringify(result));
                    }

                    helper.saveGetUserResult(results_path, value.id, result.data)

                    assert.notEqual(result.data, undefined, 'data should be in the response');
                    assert.equal(result.data.id, value.id, 'user id should be ' + value.id);
                    
                    done();
                })
        });
});