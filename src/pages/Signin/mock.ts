export const signinPageProps = {
	header: 'Регистрация',
	inputs: [
		{
			name: 'Почта',
			id: 'email',
			type: 'email',
			className: 'js-validate__email'
		},
		{
			name: 'Логин',
			id: 'login',
			className: 'js-validate__login'
		},
		{
			name: 'Имя',
			id: 'first_name',
			className: 'js-validate__first-name'
		},
		{
			name: 'Фамилия',
			id: 'second_name',
			className: 'js-validate__second-name'
		},
		{
			name: 'Телефон',
			id: 'phone',
			type: 'tel',
			placeholder: '+7(999)999-99-99',
			className: 'js-validate__phone'
		},
		{
			name: 'Пароль',
			id: 'password',
			type: 'password',
			className: 'js-validate__password'
		},
		{
			name: 'Пароль (еще раз)',
			id: 'password-repeat',
			type: 'password',
			className: 'js-validate__password--repeat'
		},
	],
	back: {
		link: 'login.html',
		text: 'Войти'
	}
};

export const signinButtonProps = {
	text: 'Зарегистрироваться',
	className: 'button signin__button'
};
