import Route from '../Route/index';
import ComponentController from '../ComponentController/index';

type asController<T> = new () => T;

export default class Router {
  private static __instance: Router;
  routes: Route[];
  history: History;
  private readonly _rootQuery: string;
  private _currentRoute: Route | null | undefined;

  constructor(rootQuery = 'body') {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname: string, block: asController<ComponentController>): Router {
    const route = new Route(pathname, block, this._rootQuery);
    this.routes.push(route);
    return this;
  }

  start(): void {
    window.onpopstate = (event: Event) => {
      if ((event.currentTarget as Document).location.hash.length) {
        return;
      }
      this._onRoute((event.currentTarget as Document).location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  go(pathname: string): void {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back(): void {
    this.history.back();
  }

  forward(): void {
    this.history.forward();
  }

  getRoute(pathname: string): Route | undefined {
    return this.routes.find(route => route.match(pathname));
  }

  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      this.go('/notFound');
      return;
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }
}
