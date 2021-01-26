import Route from '../Route/index.js';
import ComponentController from '../ComponentController/index.js';

type asController<T> = new () => T;

export default class Router {
	routes: Route[]
	history: History
	private static __instance: Router
	private readonly _rootQuery: string
	private _currentRoute: Route | null | undefined

	constructor(rootQuery: string) {
		if (Router.__instance) {
			return Router.__instance;
		}

		this.routes = [];
		this.history = window.history;
		this._currentRoute = null;
		this._rootQuery = rootQuery;

		Router.__instance = this;
	}

	use(pathname: string, block: asController<ComponentController>) {
		const route = new Route(pathname, block, this._rootQuery);
		this.routes.push(route);
		return this;
	}

	start() {
		// Реагируем на изменения в адресной строке и вызываем перерисовку
		window.onpopstate = (event: Event) => {
			console.log((event.currentTarget as Document).location.hash)
			if ((event.currentTarget as Document).location.hash.length) {
				return;
			}
			this._onRoute((event.currentTarget as Document).location.pathname);
		};

		this._onRoute(window.location.pathname);
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

	go(pathname: string) {
		this.history.pushState({}, "", pathname);
		this._onRoute(pathname);
	}

	back() {
		this.history.back();
	}

	forward() {
		this.history.forward();
	}

	getRoute(pathname: string) {
		return this.routes.find(route => route.match(pathname));
	}
}
