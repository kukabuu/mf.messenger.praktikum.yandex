export const props = {
    header: 'Иван',
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
            value: 'pochta@yandex.ru',
            isReadOnly: true
        },
        {
            name: 'Логин',
            id: 'login',
            value: 'Ivan',
            isReadOnly: true
        },
        {
            name: 'Имя',
            id: 'first_name',
            value: 'Иван',
            isReadOnly: true
        },
        {
            name: 'Фамилия',
            id: 'second_name',
            value: 'Иванов',
            isReadOnly: true
        },
        {
            name: 'Имя в чате',
            id: 'display_name',
            value: 'Ivan',
            isReadOnly: true
        },
        {
            name: 'Телефон',
            id: 'phone',
            type: 'tel',
            value: '+7(999)999-99-99',
            isReadOnly: true
        },
    ],
    footerLinks: [
        {
            name: 'Изменить данные',
            href: 'edit-profile.html'
        },
        {
            name: 'Изменить пароль',
            href: 'change-password.html'
        },
        {
            name: 'Выйти',
            href: 'login.html',
            className: 'link--exit'
        }
    ],
    back: {
        link: 'chat.html',
        text: 'Назад',
        src: './images/Back.png'
    }
};
export const updateAvatarButton = {
    text: 'Поменять',
    className: 'button popup__button'
};
export const updateAvatarPopup = {
    header: 'Загрузите файл',
    input: {
        name: 'Выбрать файл на компьютере',
        id: 'avatar',
        type: 'file',
        isRequired: true,
        className: 'js-file-upload'
    }
};
//# sourceMappingURL=mock.js.map