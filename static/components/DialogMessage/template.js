export const template = `
	<time class="dialog__date {{#unless time.date}}i-display-none{{/unless}}" datetime="{{time.full}}">
			{{time.date}}
	</time>
	{{#if type}}
		<div class="dialog__message">
			<img class="message--image person__image" 
						src="{{person.src}}" 
						alt="{{person.name}}" 
						width="34" 
						height="34">
			<div class="message {{position.className}} {{message.className}}">
			{{#if message.type}}
				<img class="{{message.type}}" src="{{message.content.src}}" alt="{{message.content.name}}">
			{{else}}
				<p>
					{{message.content}}
				</p>
			{{/if}}
				<time class="message__time" datetime="{{time.full}}">{{time.less}}</time>
			</div>
		</div>
	{{else}}
		<div class="dialog__message">
			<div class="message {{position.className}} {{message.className}}">
				{{#if message.type}}
					<img class="{{message.type}}" src="{{message.content.scr}}" alt="{{message.content.name}}">
				{{else}}
					<p>
						{{message.content}}
					</p>
				{{/if}}
				<span class="message__delivery"></span>
				<time class="message__time time--blue" datetime="{{time.full}}">{{time.less}}</time>
			</div>
		</div>
	{{/if}}`;
//# sourceMappingURL=template.js.map