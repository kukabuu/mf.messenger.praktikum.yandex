import { expect } from 'chai';

import Router from '../core/Router/index';
import ComponentController from '../core/ComponentController/index';
import Block from '../core/Block/index';

class MockedController extends ComponentController {
  private static __instance: MockedController;

  constructor() {
    super(MockedComponent, {});
    if (MockedController.__instance) {
      return MockedController.__instance;
    }
    MockedController.__instance = this;
  }
}

class MockedComponent extends Block<Record<string, unknown>> {
  constructor(props: Record<string, unknown>) {
    super(props);
  }

  render() {
    return `mocked component`;
  }
}

describe('Router', () => {
  it('should return /chats when go to \'/chats\'', (done) => {
    const router = new Router('.app');
    router.use('/chats', MockedController);
    router.go('/chats');
    const pathname = window.location.pathname;
    expect(pathname).is.eq('/chats');
    done();
  });

  it('should return /notFound when the path does not exist', (done) => {
    const router = new Router('.app');
    router.use('/chats', MockedController);
    router.use('/notFound', MockedController);
    try {
      router.go('/asldkjasdlkj');
      const pathname = window.location.pathname;
      expect(pathname).is.eq('/notFound');
      done();
    } catch (err) {
      done(err);
    }
  });
});
