export const chatAsideProps = {
	profile: {
		link: 'profile.html',
		name: 'Профиль',
		search: {
			name: 'Поиск',
			id: 'search'
		}
	}
}

export const chatListProps = {
	items: [
		{
			avatar: {
				name: 'Андрей',
				src: 'images/user_blob.png'
			},
			name: 'Андрей',
			from: {
				text: 'Вы:',
				className: 'i-display-none'
			},
			message: {
				counter: 2,
				preview: 'Друзья! У меня для вас особенный выпуск новостей! О да, вы такого еще не слышали.'
			},
			time: {
				full: '2020-11-05 18:30',
				less: '18:30'
			}
		},
		{
			avatar: {
				name: 'Непутевые заметки',
				src: 'images/user_blob.png'
			},
			name: 'Непутевые заметки',
			from: {
				text: 'Вы:'
			},
			message: {
				className: 'i-display-none',
				preview: 'Классная история!'
			},
			time: {
				full: '2020-11-01 18:30',
				less: '1 ноября'
			}
		},
		{
			avatar: {
				name: 'Андрей',
				src: 'images/user_blob.png'
			},
			name: 'Андрей',
			from: {
				text: 'Вы:',
				className: 'i-display-none'
			},
			message: {
				counter: 8,
				preview: 'Друзья! У меня для вас особенный выпуск новостей! О да, вы такого еще не слышали.'
			},
			time: {
				full: '2020-11-04 18:30',
				less: 'Ср'
			}
		},
		{
			avatar: {
				name: 'Андрей',
				src: 'images/user_blob.png'
			},
			name: 'Андрей',
			from: {
				text: 'Вы:',
				className: 'i-display-none'
			},
			message: {
				counter: 1,
				preview: 'Друзья! У меня для вас особенный выпуск новостей! О да, вы такого еще не слышали.'
			},
			time: {
				full: '2020-11-04 18:30',
				less: 'Ср'
			}
		},
		{
			avatar: {
				name: 'Андрей',
				src: 'images/user_blob.png'
			},
			name: 'Андрей',
			from: {
				text: 'Вы:',
				className: 'i-display-none'
			},
			message: {
				counter: 6,
				preview: 'Друзья! У меня для вас особенный выпуск новостей! О да, вы такого еще не слышали.'
			},
			time: {
				full: '2020-11-04 18:30',
				less: 'Ср'
			}
		},
		{
			avatar: {
				name: 'Андрей',
				src: 'images/user_blob.png'
			},
			name: 'Андрей',
			from: {
				text: 'Вы:',
				className: 'i-display-none'
			},
			message: {
				counter: 8,
				preview: 'Друзья! У меня для вас особенный выпуск новостей! О да, вы такого еще не слышали.'
			},
			time: {
				full: '2020-11-04 18:30',
				less: 'Ср'
			}
		},
		{
			avatar: {
				name: 'Андрей',
				src: 'images/user_blob.png'
			},
			name: 'Андрей',
			from: {
				text: 'Вы:',
				className: 'i-display-none'
			},
			message: {
				counter: 8,
				preview: 'Друзья! У меня для вас особенный выпуск новостей! О да, вы такого еще не слышали.'
			},
			time: {
				full: '2020-11-04 18:30',
				less: 'Ср'
			}
		},
		{
			avatar: {
				name: 'Андрей',
				src: 'images/user_blob.png'
			},
			name: 'Андрей',
			from: {
				text: 'Вы:',
				className: 'i-display-none'
			},
			message: {
				counter: 8,
				preview: 'Друзья! У меня для вас особенный выпуск новостей! О да, вы такого еще не слышали.'
			},
			time: {
				full: '2020-11-04 18:30',
				less: 'Ср'
			}
		},
	]
}

export const chat = {
	header: {
		person: {
			name: 'Андрей',
			src: 'images/user_blob.png'
		},
		tooltip: {
			options: [
				{
					text: 'Добавить пользователя',
					href: '#popup-add-user',
					className: 'option--add-user'
				},
				{
					text: 'Удалить пользователя',
					href: '#popup-remove-user',
					className: 'option--remove-user'
				},
				{
					text: 'Удалить чат',
					href: '#popup-chat-delete',
					className: 'option--delete-chat'
				},
			],
		}
	},
	footer: {
		attachments: {
			name: 'Добавить',
			src: './images/attach.png',
			options: [
				{
					text: 'Фото или Видео',
					href: '#popup-upload-file',
					className: 'option--add-foto'
				},
				{
					text: 'Файл',
					href: '#popup-upload-file',
					className: 'option--add-file'
				},
			]
		},
		sendMessage: {
			name: 'message',
			placeholder: 'Сообщение',
			button: {
				name: 'Отправить',
				src: './images/back.png'
			}
		}
	}
}

export const empty = {
	messages: []
}

export const emptyDialog = {
	text: 'Выберите чат, чтобы отправить сообщение',
	className: 'dialog--empty'
}

export const dialog = {
	messages: [
		{
			type: 'from',
			position: {
				className: 'message--left',
			},
			person: {
				src: 'images/user_blob.png',
				name: 'Андрей'
			},
			message:  {
				className: 'message--from',
				content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
					Accusamus animi architecto at cum eos esse et, hic impedit,
					laboriosam neque odit placeat quasi quidem rem sed similique
					suscipit tempore, voluptas? Accusamus blanditiis
					excepturi fuga fugit, illo ipsum nesciunt odit omnis pariatur
					quisquam, reiciendis, rerum sapiente unde vitae voluptatibus?
					Alias beatae commodi distinctio est maxime mollitia nemo repellat
					repudiandae sequi voluptatibus. Distinctio itaque
					perferendis perspiciatis quis quo suscipit tempore voluptate?
					Commodi deserunt dicta et ex impedit iusto magnam maxime repellat.
					Alias dignissimos ducimus ea esse maxime necessitatibus neque numquam,
					ut voluptas.`,
			},
			time: {
				full: '2020-11-01 20:00',
				less: '20:00',
				date: '1 ноября'
			}
		},
		{
			type: 'from',
			position: {
				className: 'message--left'
			},
			person: {
				src: 'images/user_blob.png',
				name: 'Андрей'
			},
			message: {
				type: 'attachment--image',
				className: 'message--from attachment',
				content: {
					src: 'images/cat.jpg',
					name: 'Кот',
				}
			},
			time: {
				full: '2020-11-01 20:00',
				less: '20:00'
			}
		},
		{
			position: {
				className: 'message--right'
			},
			message: {
				className: 'message--yours',
				content: 'Круто!'
			},
			time: {
				full: '2020-11-01 21:00',
				less: '21:00'
			}
		},
	]
}

export const uploadFilePopup = {
	header: 'Загрузите файл',
	input: {
		name: 'Выбрать файл на компьютере',
		id: 'file',
		type: 'file',
		className: 'js-file-upload'
	}
};

export const updateAvatarButton = {
	text: 'Поменять',
	className: 'button popup__button'
}

export const addUserPopup = {
	header: 'Добавить пользователя',
	input: {
		name: 'Логин',
		id: 'login-add',
		className: 'js-file-upload'
	}
};

export const addUserButton = {
	text: 'Добавить',
	className: 'button chat__button--toggle-user'
};

export const removeUserPopup = {
	header: 'Удалить пользователя',
	input: {
		name: 'Логин',
		id: 'login-remove',
		className: 'js-file-upload'
	}
};

export const removeUserButton = {
	text: 'Удалить',
	className: 'button chat__button--toggle-user'
};

export const deleteChatPopup = {
	header: 'Удалить чат?',
	input: {
		name: 'chatId',
		value: '1234',
		isHidden: true
	},
};

export const deleteChatButton = {
	text: 'Удалить',
	className: 'button chat__button--delete'
}

export const cancelDeleteChatButton = {
	text: 'Не удалять',
	type: 'reset',
	className: 'button chat__button--cancel'
}
