export const template = `
	<main class="container container__enter login">
		<h2 class="enter__header">
			{{header}}
		</h2>
		<form class="form js-form" action="#" method="post">
		{{#each inputs}}
			<div class="form__group">
				<label class="i-visually-hidden" for="{{id}}">{{name}}</label>
				<input class="form__input" 
								id="{{id}}" 
                type="{{#if type}}{{type}}{{else}}text{{/if}}"
								placeholder="{{name}}" 
								name="{{id}}">
				<span class="form__label--floated">{{name}}</span>
				<span class="form__field--invalid js-error i-display-none"></span>
			</div>
		{{/each}}
		</form>
		<a class="link" href="{{back.link}}">{{back.text}}</a>
	</main>`;
//# sourceMappingURL=template.js.map