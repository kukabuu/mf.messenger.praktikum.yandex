export const template = `
	<div class="chat__dialog dialog">
    <header class="dialog__header">
    	{{#with header}}
				<div class="dialog__person">
					<img class="person__image" src="{{person.src}}" alt="{{person.name}}" width="34" height="34">
					<span class="person__name">
						{{person.name}}
					</span>
				</div>
				<div class="dialog__settings">
					<span class="burger"></span>
				</div>
				<div class="dialog__tooltip tooltip--settings">
					<ul class="dialog__options">
						{{#each tooltip.options}}
							<li class="dialog__option">
								<a class="option__link {{className}}" href="{{href}}">{{text}}</a>
							</li>
						{{/each}}
					</ul>
				</div>
      {{/with}}
    </header>
    <main class="js-chat-dialog dialog__main scrollbar"></main>
    {{#with footer}}
    <footer class="dialog__footer">
    {{#with attachments}}
      <button class="dialog__button dialog__attachments">
        <img src="{{src}}" alt="{{name}}" width="32" height="32">
      </button>
      <div class="dialog__tooltip tooltip--attachments">
        <ul class="dialog__options">
        	{{#each options}}
						<li class="dialog__option">
							<a class="option__link {{className}}" href="{{href}}">{{text}}</a>
						</li>
          {{/each}}
        </ul>
      </div>
      {{/with}}
      {{#with sendMessage}}
      <form class="dialog__form js-form" action="#">
        <input class="dialog__footer--message"
               type="text"
               name="{{name}}"
               placeholder="{{placeholder}}"
               {{#if isRequired}}required{{/if}}>
        <button class="dialog__button" type="submit">
          <img class="button--send" src="{{button.src}}" alt="{{button.name}}" width="28" height="28">
        </button>
      </form>
      {{/with}}
    </footer>
    {{/with}}
  </div>
  <div class="chat__popup" id="popup-remove-user"></div>
  <div class="chat__popup" id="popup-chat-delete"></div>
  <div class="chat__popup" id="popup-add-user"></div>
  <div class="chat__popup" id="popup-upload-file"></div>
`;
//# sourceMappingURL=template.js.map