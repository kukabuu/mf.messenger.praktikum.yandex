export const loginPageProps = {
	header: 'Вход',
	inputs: [
		{
			name: 'Логин',
			id: 'login',
		},
		{
			name: 'Пароль',
			id: 'password',
			type: 'password',
		}
	],
	back: {
		link: 'signin.html',
		text: 'Нет аккаунта?'
	}
};

export const loginButtonProps = {
	text: 'Авторизоваться',
	className: 'button login__button'
};
