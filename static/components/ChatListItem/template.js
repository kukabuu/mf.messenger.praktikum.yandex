export const template = `
	<li class="list__item">
		<img class="item__image" src="{{avatar.src}}" alt="{{avatar.name}}" width="48">
		<div class="item__details">
			<span class="item__name">
				{{name}}
			</span>
			<span class="item__message">
				<span class="item__message--from-you {{from.className}}">{{from.text}}</span>
					{{message.preview}}				
				</span>
		</div>
		<time class="item__time" datetime="{{time.full}}">{{time.less}}</time>
		<span class="item__message-counter {{message.className}}">{{message.counter}}</span>
	</li>
`;
//# sourceMappingURL=template.js.map