export const template = `
	<div class="popup">
		<h2 class="popup__header">
			{{header}}
		</h2>
		<span class="popup__close-button js-popup-close">&times;</span>
		<form class="form js-form" action="#">
			{{{input}}}
			{{{button}}}
			{{{cancelButton}}}
		</form>
	</div>
`;

