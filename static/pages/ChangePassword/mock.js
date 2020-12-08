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
            name: 'Старый пароль',
            id: 'oldPassword',
            type: 'password'
        },
        {
            name: 'Новый пароль',
            id: 'password',
            type: 'password'
        },
        {
            name: 'Повторите новый пароль',
            id: 'password-repeat',
            type: 'password'
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
//# sourceMappingURL=mock.js.map