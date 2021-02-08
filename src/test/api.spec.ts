import { assert, expect } from 'chai';
import sinon from 'sinon';

import HTTP from '../core/HTTP';

const defaultData = {
  'first_name': 'Test',
  'second_name': 'Test',
  'login': 'test-login123',
  'email': 'test@test.com',
  'password': '1',
  'phone': '+7(999)999-00-00'
};

const dataJSON = JSON.stringify(defaultData);

const mockedHeaders = {
  'Content-type': 'application/json;charset=utf-8'
};

describe('API', function () {
  beforeEach(function () {
    this.xhr = sinon.useFakeXMLHttpRequest();

    this.requests = [];
    this.xhr.onCreate = function (xhr: XMLHttpRequest) {
      this.requests.push(xhr);
    }.bind(this);
  });

  afterEach(function () {
    this.xhr.restore();
  });

  describe('requests:', function () {
    it('should send GET request', function (done) {
      const httpAPI = new HTTP('/');
      httpAPI
        .get('/')
        .then((result) => {
          expect(result.method).eq('GET');
          expect(result.status).eq(200);
          done();
        })
        .catch(done);

      this.requests[0].respond(
        200,
        mockedHeaders,
        dataJSON);
    });

    it('should send POST request', function (done) {
      const httpAPI = new HTTP('/');
      httpAPI
        .post('/', {data: defaultData})
        .then((result) => {
          expect(result.method).eq('POST');
          expect(result.status).eq(200);
          done();
        })
        .catch(done);

      this.requests[0].respond(
        200,
        mockedHeaders,
        dataJSON);
    });

    it('should send PUT request', function (done) {
      const httpAPI = new HTTP('/');
      httpAPI
        .put('/', {data: defaultData})
        .then((result) => {
          expect(result.method).eq('PUT');
          expect(result.status).eq(200);
          done();
        })
        .catch(done);
      this.requests[0].respond(
        200,
        mockedHeaders,
        dataJSON);
    });

    it('should send DELETE request', function (done) {
      const httpAPI = new HTTP('/');
      httpAPI
        .delete('/', {data: defaultData})
        .then((result) => {
          expect(result.method).eq('DELETE');
          expect(result.status).eq(200);
          done();
        })
        .catch(done);
      this.requests[0].respond(
        200,
        mockedHeaders,
        dataJSON);
    });

  });

  describe('data format:', function () {
    it('should send json data format if data is object', function (done) {
      const httpAPI = new HTTP('/');
      httpAPI
        .post('/', {data: defaultData})
        .then((result) => {
          expect(result.requestHeaders).to.eql(mockedHeaders);
          expect(result.status).eq(200);
          expect(result.requestBody).eq(dataJSON);
          done();
        })
        .catch(done);
      this.requests[0].respond(
        200,
        mockedHeaders,
        dataJSON);
    });

    it('should send json data format if data is number', function (done) {
      const httpAPI = new HTTP('/');
      httpAPI
        .post('/', {data: 123})
        .then((result) => {
          expect(result.requestHeaders).to.eql(mockedHeaders);
          expect(result.status).eq(200);
          assert.typeOf(result.requestBody, 'string');
          done();
        })
        .catch(done);
      this.requests[0].respond(
        200,
        mockedHeaders,
        dataJSON);
    });

    it('should send json data format if data is array', function (done) {
      const httpAPI = new HTTP('/');
      httpAPI
        .post('/', {data: [1, 2, 3]})
        .then((result) => {
          expect(result.requestHeaders).to.eql(mockedHeaders);
          expect(result.status).eq(200);
          assert.typeOf(result.requestBody, 'string');
          done();
        })
        .catch(done);
      this.requests[0].respond(
        200,
        mockedHeaders,
        dataJSON);
    });

    it('should send null if data is null', function (done) {
      const emptyHeaders = {};
      const httpAPI = new HTTP('/');
      httpAPI
        .post('/', {data: null})
        .then((result) => {
          expect(result.requestHeaders).to.eql(emptyHeaders);
          expect(result.status).eq(200);
          assert.typeOf(result.requestBody, 'undefined');
          done();
        })
        .catch(done);
      this.requests[0].respond(
        200,
        mockedHeaders,
        dataJSON);
    });

    it('should send formData if data is formData', function (done) {
      const data = new FormData();
      data.append('name', 'Kate');

      const httpAPI = new HTTP('/');
      httpAPI
        .post('/', {data})
        .then((result) => {
          expect(result.status).eq(200);
          assert.typeOf(result.requestBody, 'FormData');
          done();
        })
        .catch(done);
      this.requests[0].respond(
        200,
        data);
    });

  });

  describe('status:', function () {
    it('should resolve response with 200 status if status is in [200, 300)', function (done) {
      const status = 'OK';
      const httpAPI = new HTTP('/');
      httpAPI
        .get('/')
        .then((result) => {
          expect(result.status).eq(200);
          expect(result.statusText).eq(status);
          done();
        })
        .catch(done);
      this.requests[0].respond(200);
    });

    it('should resolve response with 204 status if status is in [200, 300)', function (done) {
      const status = 'No Content';
      const httpAPI = new HTTP('/');
      httpAPI
        .get('/')
        .then((result) => {
          expect(result.status).eq(204);
          expect(result.statusText).eq(status);
          done();
        })
        .catch(done);
      this.requests[0].respond(204);
    });

    it('should reject response with 303 status if status is not in [200, 300)', function (done) {
      const status = 'See Other';
      const httpAPI = new HTTP('/');
      httpAPI
        .get('/')
        .then(done)
        .catch((err) => {
          expect(err.status).eq(303);
          expect(err.statusText).eq(status);
          done();
        });
      this.requests[0].respond(303);
    });
  });
});
