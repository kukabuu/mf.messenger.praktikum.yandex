type props = {
  error: string | number,
  errorText: string,
  back: {
    link: string,
    text: string
  }
}

const props = {
  error: '404',
  errorText: 'Не туда попали',
  back: {
    link: 'chat.html',
    text: 'Назад к чатам'
  },
}

export default props;
