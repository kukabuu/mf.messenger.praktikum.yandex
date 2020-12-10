export const template = `
	<div>
		<div class="form__group {{group.className}}">
			<label class="{{label.className}}" for="{{id}}">{{label.text}}</label>
			<span class="input__file-name i-display-none {{file.className}}"></span>
			<input class="form__input {{className}}"
						 id="{{id}}"
						 type="{{type}}"
						 name="{{name}}"
						 value="{{value}}"
						 placeholder="{{placeholder}}"
						 {{#if isReadOnly}}readonly{{/if}}
						 {{#if isHidden}}hidden{{/if}}>
			<span class="form__label--floated {{floatedLabel.className}}">{{floatedLabel.text}}</span>
			{{{errorEntry}}}
		</div>
		{{{errorProfile}}}
	</div>
`;
//# sourceMappingURL=template.js.map