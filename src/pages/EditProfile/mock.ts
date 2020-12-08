export const props = {
	avatar: {
		name: 'Аватар',
		src: './images/profile_blob.png',
		link: '#popup-update-avatar',
		linkText: 'Поменять аватар',
	},
	inputs: [
		{
			name: 'Почта',
			id: 'email',
			type: 'email',
			value: 'pochta@yandex.ru'
		},
		{
			name: 'Логин',
			id: 'login',
			value: 'Ivan'
		},
		{
			name: 'Имя',
			id: 'first_name',
			value: 'Иван'
		},
		{
			name: 'Фамилия',
			id: 'second_name',
			value: 'Иванов'
		},
		{
			name: 'Имя в чате',
			id: 'display_name',
			value: 'Ivan'
		},
		{
			name: 'Телефон',
			id: 'phone',
			type: 'tel',
			value: '+7(999)999-99-99'
		},
	],
	back: {
		link: 'profile.html',
		text: 'Назад',
		src: './images/Back.png'
	}
};

export const buttonProps = {
	text: 'Сохранить',
	className: 'button edit-profile__button'
};
