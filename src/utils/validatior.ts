const emailValidation = {
  required: '이메일을 입력하세요.',
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: '올바른 이메일 주소를 입력하세요.',
  },
};

const passwordValidation = {
  required: '비밀번호를 입력하세요.',
  minLength: {
    value: 8,
    message: '비밀번호는 최소 8글자 이상이어야 합니다.',
  },
  pattern: {
    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    message: '비밀번호는 영문자와 숫자를 포함하여야 합니다.',
  },
};

export { emailValidation, passwordValidation };
