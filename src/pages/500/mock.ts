type props = {
	error: string | number,
	errorText: string,
	backLink: string,
	backText: string
}

const props = {
	error: '500',
	errorText: 'Мы уже фиксим',
	back: {
		link: 'chat.html',
		text: 'Назад к чатам'
	}
}

export default props;
