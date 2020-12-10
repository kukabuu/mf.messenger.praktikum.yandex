export const template = `
	<main class="container container__enter {{className}}">
		<h2 class="enter__header">
			{{header}}
		</h2>
		<form class="form js-form" action="#" method="post">
			{{{inputs}}}
			{{{button}}}
		</form>
		<a class="link" href="{{back.link}}">{{back.text}}</a>
	</main>`;
