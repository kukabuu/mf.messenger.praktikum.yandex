import { assert, expect } from 'chai';
import sinon from 'sinon';

import HTTP, { METHOD } from '../core/HTTP/index';
import { getQueryString } from '../utils/getQueryString';

const defaultData = {
  'first_name': 'Test',
  'second_name': 'Test',
  'login': 'test-login123',
  'email': 'test@test.com',
  'password': '1',
  'phone': '+7(999)999-00-00'
};
const dataJSON = JSON.stringify(defaultData);
const stringifyData = (url: string): string => {
  const data = getQueryString(defaultData);
  return `${url}${data}`;
};

const mockedHeaders = {
  'Content-Type': 'application/json;charset=utf-8'
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

  describe('methods:', function () {
    it('method .get should work correctly without data', () => {
      const httpAPI = new HTTP('/');
      httpAPI.request = sinon.spy();
      httpAPI.get('/');
      sinon.assert.calledWith(
        httpAPI.request,
        '/', {method: METHOD.GET}
        );
    });

    it('method .get should work correctly with data', () => {
      const url = '/chats';
      const stringifiedData = stringifyData(url);
      const httpAPI = new HTTP('/');
      httpAPI.request = sinon.spy();
      httpAPI.get(url, {data: defaultData});
      sinon.assert.calledWith(
        httpAPI.request,
        `${stringifiedData}`, {data: defaultData, method: METHOD.GET}
        );
    });

    it('method .post should work correctly with data', () => {
      const url = '/chats';
      const httpAPI = new HTTP('/');
      httpAPI.request = sinon.spy();
      httpAPI.post(url, {data: defaultData});
      sinon.assert.calledWith(
        httpAPI.request,
        `${url}`, {data: defaultData, method: METHOD.POST}
      );
    });

    it('method .post should work correctly without data', () => {
      const url = '/chats';
      const httpAPI = new HTTP('/');
      httpAPI.request = sinon.spy();
      httpAPI.post(url);
      sinon.assert.calledWith(
        httpAPI.request,
        `${url}`, {method: METHOD.POST}
      );
    });

    it('method .put should work correctly with data', () => {
      const url = '/chats';
      const httpAPI = new HTTP('/');
      httpAPI.request = sinon.spy();
      httpAPI.put(url, {data: defaultData});
      sinon.assert.calledWith(
        httpAPI.request,
        `${url}`, {data: defaultData, method: METHOD.PUT}
      );
    });

    it('method .put should work correctly without data', () => {
      const url = '/chats';
      const httpAPI = new HTTP('/');
      httpAPI.request = sinon.spy();
      httpAPI.put(url);
      sinon.assert.calledWith(
        httpAPI.request,
        `${url}`, {method: METHOD.PUT}
      );
    });

    it('method .delete should work correctly with data', () => {
      const url = '/chats';
      const httpAPI = new HTTP('/');
      httpAPI.request = sinon.spy();
      httpAPI.delete(url, {data: defaultData});
      sinon.assert.calledWith(
        httpAPI.request,
        `${url}`, {data: defaultData, method: METHOD.DELETE}
      );
    });

    it('method .delete should work correctly without data', () => {
      const url = '/chats';
      const httpAPI = new HTTP('/');
      httpAPI.request = sinon.spy();
      httpAPI.delete(url);
      sinon.assert.calledWith(
        httpAPI.request,
        `${url}`, {method: METHOD.DELETE}
      );
    });

    it('method .request should work correctly with data', function (done) {
      const httpAPI = new HTTP('/');
      httpAPI
        .request('/', {data: defaultData})
        .then((result) => {
          expect(result.requestHeaders).to.eql(mockedHeaders);
          expect(result.requestBody).to.eq(dataJSON);
          done();
        })
        .catch(done);
      this.requests[0].respond(
        200,
        mockedHeaders,
        dataJSON);
    });

    it('method .request should work correctly without data', function (done) {
      const httpAPI = new HTTP('/');
      httpAPI
        .request('/')
        .then((result) => {
          expect(result.requestHeaders).to.eql(mockedHeaders);
          assert.typeOf(result.requestBody, 'undefined');
          done();
        })
        .catch(done);
      this.requests[0].respond(
        200,
        mockedHeaders);
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
      const httpAPI = new HTTP('/');
      httpAPI
        .post('/', {data: null})
        .then((result) => {
          expect(result.requestHeaders).to.eql(mockedHeaders);
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
      const emptyHeaders = {};
      const data = new FormData();
      data.append('name', 'Kate');

      const httpAPI = new HTTP('/');
      httpAPI
        .post('/', {data})
        .then((result) => {
          expect(result.requestHeaders).to.eql(emptyHeaders);
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
