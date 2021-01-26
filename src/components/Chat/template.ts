export const template = `
	<aside class="chat__aside js-aside">
		<a class="chat__link" href="{{profile.link}}">{{profile.name}}</a>
		<form action="#" class="chat__search search js-search" method="{{search.method}}">
			<label class="i-visually-hidden" for="{{search.id}}">{{search.name}}</label>
			<input class="search__input" name="login" id="{{search.id}}" type="text" placeholder="{{search.name}}">
			<span class="search__icon"></span>
		</form>
		<ul class="list scrollbar js-chat-list">
			{{{chatListItems}}}
		</ul>
		{{{ buttonChatCreate }}}
  </aside>
	<div class="chat__dialog dialog">
    <header class="dialog__header">
    	{{#with header}}
				<div class="dialog__person">
					<img class="person__image" src="{{person.src}}" alt="{{person.name}}" width="34" height="34">
					<span class="person__name">
						{{person.name}}
					</span>
				</div>
				<div class="dialog__settings js-tooltip__button">
					<span class="burger"></span>
				</div>
				<div class="dialog__tooltip tooltip--settings js-tooltip i-display-none">
					<ul class="dialog__options">
						{{#each tooltip.options}}
							<li class="dialog__option">
								<span class="option__link {{className}}" data-popup="{{href}}">{{text}}</span>
							</li>
						{{/each}}
					</ul>
				</div>
      {{/with}}
    </header>
    <main class="js-chat-dialog dialog__main scrollbar">
    	{{{dialog}}}
		</main>
    {{#with footer}}
    <footer class="dialog__footer">
    	{{#with attachments}}
				{{{buttonAddAttachments}}}
				<div class="dialog__tooltip tooltip--attachments js-tooltip i-display-none">
					<ul class="dialog__options">
						{{#each options}}
							<li class="dialog__option">
								<span class="option__link {{className}}" data-popup="{{href}}">{{text}}</span>
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
					{{{buttonSendMessage}}}
				</form>
      {{/with}}
    </footer>
    {{/with}}
  </div>
  <div class="js-popup chat__popup" id="popup-remove-user">
  		{{{popupRemoveUser}}}
	</div>
  <div class="js-popup chat__popup" id="popup-chat-delete">
  		{{{popupChatDelete}}}
	</div>
  <div class="js-popup chat__popup" id="popup-add-user">
  		{{{popupAddUser}}}
	</div>
  <div class="js-popup chat__popup" id="popup-upload-file">
  		{{{popupUploadFile}}}
	</div>
	<div class="js-popup chat__popup" id="popup-add-chat">
  		{{{popupAddChat}}}
	</div>
	{{{ notification }}}
`;
