export const template = `
	<main class="container container__profile">
    <div class="profile__avatar {{avatarInfo.classToChange}}">
      <img class="avatar" src="{{avatar}}" alt="{{avatarInfo.name}}" width="130">
      <div class="avatar__link">
        <a class="link link__text js-add-file" data-popup="{{avatarInfo.link}}">
          {{avatarInfo.linkText}}
        </a>
      </div>
    </div>
    <h2 class="profile__header">
      {{header}}
    </h2>
    <form class="form profile__form {{form.className}}" action="#" method="{{form.method}}">
    	{{{inputs}}}
    	{{{button}}}
    </form>
    <div class="profile__footer">
    	{{#each footerLinks}}
      	<a class="link profile__link {{className}}" href="{{href}}">{{name}}</a>
      {{/each}}
    </div>
    <a class="profile__button button--back" href="{{back.link}}">
      <img src="{{back.src}}" alt="{{back.text}}" width="28">
    </a>
  </main>
  <div class="js-popup profile__popup" id="popup-update-avatar">
  	{{{popup}}}
	</div>
	{{{ notification }}}
`;
