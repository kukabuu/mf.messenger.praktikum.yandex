export const toggleUserPopup = `
	<div class="popup">
		<h2 class="popup__header">
			{{header}}
		</h2>
		<a class="popup--close" href="#">&times;</a>
		<form class="form js-form" action="#">
			<div class="form__group">
				{{#with input}}
				<label class="i-visually-hidden" for="{{id}}">{{name}}</label>
				<input class="form__input" 
								id="{{id}}" 
								type="text" 
								placeholder="{{name}}" 
								name="{{id}}" 
								{{#if isRequired}}required{{/if}}>
				<span class="form__label--floated">{{name}}</span>
				<span class="form__field--invalid js-error i-display-none"></span>
				{{/with}}
			</div>
		</form>
	</div>
`;
export const deleteChatPopup = `
	<div class="popup">
		<h2 class="popup__header">
			{{header}}
		</h2>
		<a class="popup--close" href="#">&times;</a>
		<form class="form js-form" action="#">
			{{#with input}}
				<input type="text" 
							name="{{name}}" 
							value="{{value}}" 
							{{#if isHidden}}hidden{{/if}}>	
			{{/with}}
		</form>
	</div>
`;
export const uploadFile = `
	<div class="popup">
		<h2 class="popup__header">
			{{header}}
		</h2>
		<a class="popup--close" href="#">&times;</a>
		<form class="form js-form" action="#">
			<div class="form__group popup__form-group">
			{{#with input}}
				<label class="form__label popup__label js-file-upload--label" for="{{id}}">{{name}}</label>
				<span class="input__file-name i-display-none js-file-name"></span>
				<input class="form__input--file {{className}}"
							 id="{{id}}"
							 type="{{type}}"
							 name="{{id}}">
		 	{{/with}}
		 	<span class="form__field--invalid js-error popup--error i-display-none"></span>
			</div>
		</form>
	</div>
`;
//# sourceMappingURL=template.js.map