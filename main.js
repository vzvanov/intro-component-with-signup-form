const elements = ['firstName', 'lastName', 'email', 'password'];
let messages = [];
const form = document.querySelector('form');

form.onsubmit = (e) => {
  e.preventDefault();
  removeMessages();
  messages = [];
  makeMessages();
  showIcons();
  showMessages();
}

const removeMessages = () => {
  messages.forEach(message => {
    message?.msg.remove();
    message?.icon.remove();
    let current = document.querySelector(`.${message.element}`);
    current.classList.remove('error');
  })
}

const makeMessages = () => {
  elements.forEach(element => {
    let current = document.querySelector(`#${element}`);
    // Constraint validation API
    if (current.validationMessage) messages.push({
      'element': element,
      'error': current.validationMessage
    });
  })
}

const showMessages = () => {
  messages.forEach(message => {
    let errorElement = getErrorMessageElement(message.error);
    message.msg = errorElement;
    let current = document.querySelector(`.${message.element}`);
    current.after(errorElement);
    current.classList.add('error');
  })
}

const showIcons = () => {
  messages.forEach(message => {
    let iconElement = getIconErrorElement();
    message.icon = iconElement;
    current = document.querySelector(`#${message.element}`);
    current.after(iconElement);
  })
}

const getErrorMessageElement = (text) => {
  let errorElement = document.createElement('div');
  errorElement.classList.add("msg");
  errorElement.innerHTML = text;
  return errorElement;
}

const getIconErrorElement = () => {
  let iconElement = document.createElement('div');
  iconElement.innerHTML =
    `<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fill-rule="evenodd">
        <circle fill="#FF7979" cx="12" cy="12" r="12" />
        <rect fill="#FFF" x="11" y="6" width="2" height="9" rx="1" />
        <rect fill="#FFF" x="11" y="17" width="2" height="2" rx="1" />
      </g>
    </svg>`;
  return iconElement;
}
