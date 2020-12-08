export const template = `
	<aside class="chat__aside js-aside">
		{{#with profile}}
			<a class="chat__link" href="{{link}}">{{name}}</a>
			<form action="#" class="chat__search search">
				<label class="i-visually-hidden" for="{{search.id}}">{{search.name}}</label>
				<input class="search__input" id="{{search.id}}" type="text" placeholder="{{search.name}}">
				<span class="search__icon"></span>
			</form>
		{{/with}}
		<ul class="list scrollbar js-chat-list"></ul>
  </aside>`;
