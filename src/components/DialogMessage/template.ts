export const template = `
	{{#if isEmpty}}
		<span class="dialog--empty">
			{{empty.text}}
		</span>
	{{else}}
	<time class="dialog__date {{date.className}}" datetime="{{time.full}}">
			{{date.value}}
	</time>
	{{#if from}}
		<div class="dialog__message">
			<img class="message--image person__image" 
						src="{{person.src}}" 
						alt="{{person.name}}" 
						width="34" 
						height="34">
			<div class="message {{position.className}} {{message.className}}">
			{{#if isAttachment}}
				<img class="{{attachment.className}}" src="{{attachment.src}}" alt="{{attachment.name}}">
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
				{{#if isAttachment}}
					<img class="{{attachment.className}}" src="{{attachment.src}}" alt="{{attachment.name}}">
				{{else}}
					<p>
						{{message.content}}
					</p>
				{{/if}}
				<span class="message__delivery"></span>
				<time class="message__time time--blue" datetime="{{time.full}}">{{time.less}}</time>
			</div>
		</div>
	{{/if}}
{{/if}}`;
