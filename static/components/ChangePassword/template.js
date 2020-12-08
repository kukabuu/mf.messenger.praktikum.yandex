export const template = `
<main class="container container__profile">
  <div class="profile__avatar">
			{{#with avatar}}
				<img class="avatar" src="{{src}}" alt="{{name}}" width="130">
				<div class="avatar__link">
					<a class="link link__text" href="#">
						{{linkText}}
					</a>
				</div>
			{{/with}}
		</div>
  <h2 class="profile__header">
    {{header}}
  </h2>
  <form class="form profile__form js-form" action="#" method="post">
  	{{#each inputs}}
  	<div>
  		<div class="form__group profile__group">
				<label class="form__label profile__label" for="{{id}}">{{name}}</label>
				<input class="form__input profile__input"
							 id="{{id}}"
							 type="{{type}}"
							 name="{{id}}">
			</div>
			<span class="form__field--invalid profile__field js-error i-display-none"></span>
		</div>
    {{/each}}
  </form>
  {{#with back}}
		<a class="profile__button button--back" href="{{link}}">
			<img src="{{src}}" alt="{{text}}" width="28">
		</a>
  {{/with}}
</main>`;
//# sourceMappingURL=template.js.map